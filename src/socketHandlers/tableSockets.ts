import { Op } from "sequelize";
import { initModels } from "../models/init-models";
import { formatedRooms } from "../utils/socketUtils";
import { Server, Socket } from "socket.io";

const Sessions = initModels().reservations;

export const getAdminPanelInfo = async (
  socket: Socket | undefined,
  io: Server
) => {
  const rooms = io.sockets.adapter.rooms;
  const tableRooms = formatedRooms(rooms);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const todaySessions = await Sessions.findAll({
    where: {
      started_time: {
        [Op.gte]: today,
        [Op.lt]: tomorrow,
      },
    },
  });
  // console.log(todaySessions);

  io.to("overview-users").emit("adminInfo", { tableRooms, todaySessions });
  // console.log("run shod");
};
