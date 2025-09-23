import express from "express";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import formatedRooms from "./utils/socketUtils";
import sessionRouter from "./routes/session";
import sequelize from "./config/database";
import { initSocket } from "./sockets";

dotenv.config();

const app: express.Application = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*", // later restrict to your frontend domain
  },
});

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.use(bodyParser.json());

app.use("/api/session", sessionRouter);

initSocket(httpServer);

const port = process.env.PORT || 5000;

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
