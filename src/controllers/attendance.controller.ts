import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import {createSession, getSessionsByCourse, markAttendance} from "../services/attendance.service";

export const createSessionHandler = async (req: AuthRequest, res: Response) => {
    try {
        const { courseId, date, topic } = req.body;
        // You might want to verify that req.user.id is the professor of this course
        const session = await createSession(courseId, date ? new Date(date) : undefined, topic);
        res.status(201).json(session);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

// This is the bridge from face-recognition -> DB
export const markAttendanceHandler = async (req: AuthRequest, res: Response) => {
    try {
        const { sessionId, studentIds } = req.body; // array of student userIds
        const result = await markAttendance(sessionId, studentIds, "PRESENT");
        res.json({ updated: result.length });
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

export const getSessionsByCourseHandler = async (req: AuthRequest, res: Response) => {
    try {
        const { courseId } = req.params
        if (!courseId) {
            return res.status(400).json({ message: "courseId is required" })
        }

        const sessions = await getSessionsByCourse(courseId)
        return res.json(sessions)
    } catch (err: any) {
        console.error("Error fetching sessions for course:", err)
        return res.status(500).json({ message: err.message || "Failed to fetch sessions" })
    }
}