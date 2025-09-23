import { Router } from "express";
import { createSession } from "../controllers/sessionControllers";

const router = Router();

router.post("/create", createSession);

export default router;
