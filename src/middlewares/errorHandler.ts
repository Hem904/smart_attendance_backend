import { Request, Response, NextFunction } from "express";

export function notFoundHandler(req: Request, res: Response) {
    res.status(404).json({ message: "Route not found" });
}

export function errorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error(err);
    res.status(err.status || 500).json({
        message: err.message || "Internal server error"
    });
}
