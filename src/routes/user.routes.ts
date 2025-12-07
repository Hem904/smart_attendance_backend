import { Router } from "express"
import { authMiddleware } from "../middlewares/auth.middleware"
import { requireRole } from "../middlewares/requireRole"
import { getProfessors } from "../controllers/user.controller"

export const userRouter = Router()

// Only universities should be able to fetch professor list
userRouter.get(
    "/professors",
    authMiddleware,
    requireRole("university"),
    getProfessors
)
