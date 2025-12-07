import { Router } from "express"
import { authMiddleware } from "../middlewares/auth.middleware"
import { requireRole } from "../middlewares/requireRole"
import {
    createCourseHandler,
    enrollStudentHandler,
    myCoursesHandler,
    getAllCoursesHandler,   // 👈 add this import
} from "../controllers/course.controller"

export const courseRouter = Router()

// 🔥 NEW: get all courses (for browsing)
courseRouter.get("/", authMiddleware, getAllCoursesHandler)

// University creates courses
courseRouter.post(
    "/",
    authMiddleware,
    requireRole("university"),
    createCourseHandler
)

// Student enrolls in course
courseRouter.post(
    "/:courseId/enroll",
    authMiddleware,
    requireRole("student"),
    enrollStudentHandler
)

// Get my courses based on role
courseRouter.get("/me", authMiddleware, myCoursesHandler)