import { Router } from "express";
import {
    registerStudent,
    registerProfessor,
    registerUniversity,
    login
} from "../controllers/auth.controller";

export const authRouter = Router();

authRouter.post("/register/student", registerStudent);
authRouter.post("/register/professor", registerProfessor);
authRouter.post("/register/university", registerUniversity);
authRouter.post("/login", login);
