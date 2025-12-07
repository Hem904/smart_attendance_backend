import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service";
import {User, UserRole} from "../models/User";
import { registerFace } from "../services/face.service";

export const registerStudent = async (req: Request, res: Response) => {
    try {
        const { name, email, password, image } = req.body;

        if (!image) {
            return res.status(400).json({ message: "Image is required for student signup" });
        }

        // 1. Create user
        const { user, token } = await registerUser(name, email, password, "student");

        // 2. Register face in Python service using user._id as faceId
        await registerFace(user._id.toString(), image);

        // 3. Update user to mark face as registered
        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            { faceRegistered: true },
            { new: true }
        );

        res.status(201).json({ user: updatedUser, token });
    } catch (err: any) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
};

export const registerProfessor = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const { user, token } = await registerUser(name, email, password, "professor");
        res.status(201).json({ user, token });
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

export const registerUniversity = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const { user, token } = await registerUser(name, email, password, "university");
        res.status(201).json({ user, token });
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await loginUser(email, password);
        res.json({ user, token });
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};
