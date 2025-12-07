import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { requireRole } from "../middlewares/requireRole";
import {
    registerFaceHandler,
    recognizeAndMarkHandler
} from "../controllers/face.controller";

export const faceRouter = Router();

// Any authenticated user can register their face (usually student)
faceRouter.post("/register", authMiddleware, registerFaceHandler);

// Professor triggers recognition + attendance marking
faceRouter.post(
    "/recognize",
    authMiddleware,
    requireRole("professor"),
    recognizeAndMarkHandler
);
