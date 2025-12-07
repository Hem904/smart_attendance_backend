import { Request, Response } from "express"
import { User } from "../models/User"

export const getProfessors = async (req: Request, res: Response) => {
    try {
        const professors = await User.find({ role: "professor" })
            .select("_id name email createdAt")

        res.json(professors)
    } catch (err: any) {
        console.error("Error fetching professors:", err)
        res.status(500).json({
            message: err.message || "Failed to fetch professors",
        })
    }
}
