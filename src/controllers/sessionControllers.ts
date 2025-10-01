import { Request, Response } from "express";
import { initModels } from "../models/init-models";
import { sendSmsToInvitedPeople } from "../utils/smsUtils";
import sequelize from "../config/database";

const reservations = initModels().reservations;

// type createSessionBody = {
//     invitedPeople:
// }

export const createSession = async (req: Request, res: Response) => {
  const {
    tableId,
    invitedPeople,
    sessionDescription,
    startedTime,
    endTime,
    title,
  } = req.body;

  if (
    !(
      invitedPeople ||
      sessionDescription ||
      tableId ||
      startedTime ||
      endTime ||
      title
    )
  ) {
    res
      .status(400)
      .json({ message: "لطفا تمام اطلاعات را وارد کنید", success: false });
    return;
  }
  const transaction = await reservations.sequelize?.transaction();

  try {
    const reserve = await reservations.create(
      {
        invited_people: invitedPeople,
        session_description: sessionDescription,
        table_id: tableId,
        started_time: startedTime,
        end_time: endTime,
        title,
      },
      { transaction }
    );

    await Promise.all(
      invitedPeople.map((person: { phoneNumber: string; fullName: string }) =>
        sendSmsToInvitedPeople(
          person.phoneNumber,
          person.fullName,
          title,
          startedTime.toString(),
          endTime.toString()
        )
      )
    );
    await transaction?.commit();

    res.status(200).json({ message: "session created", success: true });
  } catch (error) {
    res.status(500).json({ message: "server error", success: false });
    await transaction?.rollback();
    console.log(error);
    return;
  }
};

export const deleteSession = async (req: Request, res: Response) => {
  const { id } = req.params;

  console.log(id);

  if (!id) {
    res
      .status(400)
      .json({ message: "the sessionid is required", success: false });
    return;
  }

  try {
    const target = await reservations.findByPk(id);

    if (!target) {
      res.status(404).json({ message: "cant find session", success: false });
      return;
    }

    await target.destroy();
    res.status(200).json({ message: "session is deleted", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error", success: false });
    return;
  }
};
