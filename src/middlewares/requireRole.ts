import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";
import { UserRole } from "../models/User";

export function requireRole(...roles: UserRole[]) {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes(req.user.role as UserRole)) {
            return res.status(403).json({ message: "Forbidden" });
        }
        next();
    };
}
