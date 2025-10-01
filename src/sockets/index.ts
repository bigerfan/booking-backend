import { Server } from "socket.io";
import { formatedRooms } from "../utils/socketUtils";
import registerTableHandlers from "./tableSocket";
import { getAdminPanelInfo } from "../socketHandlers/tableSockets";
// import registerSessionHandlers from "./sessionSocket";

export function initSocket(httpServer: any) {
  const io = new Server(httpServer, {
    cors: { origin: "*" },
    pingInterval: 25000, // send pings every 25s
    pingTimeout: 60000,
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // table handlers
    registerTableHandlers(io, socket);

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
      getAdminPanelInfo(socket, io);
    });
  });

  return io;
}
