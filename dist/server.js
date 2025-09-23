"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const socketUtils_1 = require("./utils/socketUtils");
dotenv_1.default.config();
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "*", // later restrict to your frontend domain
    },
});
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(body_parser_1.default.json());
// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//   console.error(err.stack);
//   res.status(500).json({ error: err.message });
// });
// io.on("connection", (socket) => {
//   console.log("a user connected");
// });
// io.on("create-session", (msg) => {
//   console.log("beww");
//   console.log(msg);
// });
// let registered_tables: any[] = [];
io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);
    // // Listen for session creation event
    // socket.on("create-session", (data) => {
    //   console.log("Received session data:", data);
    //   if (
    //     data.invitedPeople.length < 1 ||
    //     !data.sessionDescription ||
    //     !data.date ||
    //     !data.time
    //   ) {
    //     socket.emit("validation-error", {
    //       success: false,
    //       message: "please enter all information",
    //     });
    //     return;
    //   }
    // Example data:
    // {
    //   invitedPeople: [{ fullName, phoneNumber }],
    //   description: "some text",
    //   time: "12:00",
    //   date: "2025-09-20"
    // }
    // Save to DB, do logic here
    // ...
    // Send confirmation back
    // socket.emit("session-created", {
    //   success: true,
    //   message: "Session saved!",
    // });
    // });
    socket.on("leave-table", ({ tableId }) => {
        // registered_tables.filter((table) => table.id !== tableId);
    });
    socket.on("register_table", (id) => {
        // console.log(id);
        // if (!registered_tables.some((t) => t.id === id))
        //   registered_tables.push({
        //     id,
        //     socketId: socket.id,
        //   });
        socket.join(`table:${id}`);
        const rooms = io.sockets.adapter.rooms;
        const tableRooms = (0, socketUtils_1.formatedRooms)(rooms);
        io.to("overview_users").emit("tables", tableRooms);
    });
    socket.on("join_overview", () => {
        socket.join("overview_users");
        const rooms = io.sockets.adapter.rooms;
        // console.log(rooms);
        const tableRooms = (0, socketUtils_1.formatedRooms)(rooms);
        console.log(tableRooms);
        io.to("overview_users").emit("tables", tableRooms);
    });
    socket.on("disconnect", (id) => {
        console.log("Client disconnected:", socket.id);
        const rooms = io.sockets.adapter.rooms;
        const tableRooms = (0, socketUtils_1.formatedRooms)(rooms);
        io.to("overview_users").emit("tables", tableRooms);
    });
});
const port = process.env.PORT || 5000;
httpServer.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
