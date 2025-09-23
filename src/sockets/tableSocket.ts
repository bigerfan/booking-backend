import { initModels } from "../models/init-models";
import formatedRooms from "../utils/socketUtils";
// import Session from "../models/session"; // فرضی

const Sessions = initModels().reservations;

export default function registerTableHandlers(io: any, socket: any) {
  socket.on("register_table", async (id: number) => {
    socket.join(`table:${id}`);

    const rooms = io.sockets.adapter.rooms;
    const tableRooms = formatedRooms(rooms);
    io.to("overview_users").emit("tables", tableRooms);

    const sessions = await Sessions.findAll({ where: { table_id: id } });
    console.log(sessions);
    socket.emit("sessions", sessions);
  });

  socket.on("join_overview", () => {
    socket.join("overview_users");

    const rooms = io.sockets.adapter.rooms;
    const tableRooms = formatedRooms(rooms);

    io.to("overview_users").emit("tables", tableRooms);
  });

  socket.on("new-session", async (tableId: number) => {
    console.log(tableId);
    const formatedId = tableId.toString();
    const sessions = await Sessions.findAll({
      where: { table_id: formatedId },
    });
    console.log(sessions);
    io.emit("sessions", sessions);
  });
}
