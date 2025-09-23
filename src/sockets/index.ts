import { Server } from "socket.io";
import formatedRooms from "../utils/socketUtils";
import registerTableHandlers from "./tableSocket";
// import registerSessionHandlers from "./sessionSocket";

export function initSocket(httpServer: any) {
  const io = new Server(httpServer, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // table handlers
    registerTableHandlers(io, socket);

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
      const rooms = io.sockets.adapter.rooms;
      const tableRooms = formatedRooms(rooms);

      io.to("overview_users").emit("tables", tableRooms);
    });
  });

  return io;
}
