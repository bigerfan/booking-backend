import { Router } from "express";
import {
  createSession,
  deleteSession,
} from "../controllers/sessionControllers";

const router = Router();

router.post("/create", createSession);

router.post("/delete/:id", deleteSession);

export default router;
