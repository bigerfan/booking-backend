import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import sessionRouter from "./routes/session";
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

export const initedIo = initSocket(httpServer);

const port = process.env.PORT || 5001;

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
