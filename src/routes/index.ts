import { Router } from "express";
import { authRouter } from "./auth.routes";
import { courseRouter } from "./course.routes";
import { attendanceRouter } from "./attendance.routes";
import { faceRouter } from "./face.routes";
import {userRouter} from "./user.routes";

export const router = Router();

router.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

router.use("/auth", authRouter);
router.use("/courses", courseRouter);
router.use("/attendance", attendanceRouter);
router.use("/face", faceRouter);
router.use("/users", userRouter)
