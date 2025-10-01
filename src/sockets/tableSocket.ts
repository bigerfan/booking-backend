import { Op } from "sequelize";
import { initModels } from "../models/init-models";
import { formatedRooms } from "../utils/socketUtils";
import { getAdminPanelInfo } from "../socketHandlers/tableSockets";
import { Server, Socket } from "socket.io";
// import Session from "../models/session"; // فرضی

const Sessions = initModels().reservations;

export default function registerTableHandlers(io: Server, socket: Socket) {
  // when someone enter in a table
  socket.on("register-table", async (id: number) => {
    socket.join(`table:${id}`);

    // const rooms = io.sockets.adapter.rooms;
    // const tableRooms = formatedRooms(rooms);
    // io.to("overview_users").emit("tables", tableRooms);
    await getAdminPanelInfo(socket, io);

    const sessions = await Sessions.findAll({ where: { table_id: id } });
    // console.log(sessions);
    socket.emit("sessions", sessions);
  });

  // when someone enter on admin panel
  socket.on("join-overview", () => {
    socket.join("overview-users");
    getAdminPanelInfo(socket, io);
  });

  // when someone create a newsession
  socket.on("update-session", async (tableId: string) => {
    // console.log(tableId);
    const formatedId = tableId.toString();
    const sessions = await Sessions.findAll({
      where: { table_id: formatedId },
    });
    io.to(`table:${tableId}`).emit("sessions", sessions);
    await getAdminPanelInfo(socket, io);
  });

  // when someone leave table
  socket.on("leave-table", async (tableId: string) => {
    socket.leave(`table:${tableId}`);
    await getAdminPanelInfo(socket, io);
  });
}
