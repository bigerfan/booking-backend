import { Request, Response } from "express";
import { initModels } from "../models/init-models";

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
      .json({ message: "please enter all information", success: false });
    return;
  }

  try {
    const reserve = await reservations.create({
      invited_people: invitedPeople,
      session_description: sessionDescription,
      table_id: tableId,
      started_time: startedTime,
      end_time: endTime,
      title,
    });
    res.status(200).json({ message: "session created", success: true });
  } catch (error) {
    res.status(500).json({ message: "server error", success: false });
    console.log(error);
  }
};
