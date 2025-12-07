import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { requireRole } from "../middlewares/requireRole";
import {
    createSessionHandler, getSessionsByCourseHandler,
    markAttendanceHandler
} from "../controllers/attendance.controller";

export const attendanceRouter = Router();

// Professor creates session
attendanceRouter.post(
    "/session",
    authMiddleware,
    requireRole("professor"),
    createSessionHandler
);

// Professor marks attendance (typically called after /face/recognize)
attendanceRouter.post(
    "/mark",
    authMiddleware,
    requireRole("professor"),
    markAttendanceHandler
);
// 🔥 NEW: get all sessions for a given course
attendanceRouter.get(
    "/course/:courseId/sessions",
    authMiddleware, // any authenticated role can view sessions
    getSessionsByCourseHandler
)