import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { recognizeFaces, registerFace } from "../services/face.service";
import { User } from "../models/User";
import { markAttendance } from "../services/attendance.service";

export const registerFaceHandler = async (req: AuthRequest, res: Response) => {
    try {
        const user = await User.findById(req.user!.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        const { image } = req.body;
        if (!image) return res.status(400).json({ message: "Image is required" });

        const result = await registerFace(user._id.toString(), image);
        user.faceRegistered = true;
        await user.save();

        res.json({ message: "Face registered", result, user });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

export const recognizeAndMarkHandler = async (req: AuthRequest, res: Response) => {
    try {
        const { image, sessionId } = req.body;
        if (!image || !sessionId) {
            return res.status(400).json({ message: "image and sessionId are required" });
        }

        // 1. Recognize faces via Python
        const { recognized } = await recognizeFaces(image); // list of mongo IDs as strings

        // 2. Load those users (students)
        const students = await User.find({
            _id: { $in: recognized },
            role: "student"
        });

        const studentIds = students.map((s) => s._id.toString());

        // 3. Mark attendance for this session
        await markAttendance(sessionId, studentIds, "PRESENT");

        res.json({
            recognizedStudentIds: studentIds,
            count: studentIds.length,
            sessionId
        });
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};
