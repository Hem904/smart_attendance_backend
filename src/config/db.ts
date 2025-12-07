import mongoose from "mongoose";
import { env } from "./env";

export async function connectDB() {
    try {
        await mongoose.connect(env.MONGO_URI, {
            dbName: "Attendance_system"
        });
        console.log("✅ MongoDB connected to Attendance_system");
    } catch (err) {
        console.error("❌ MongoDB connection error", err);
        process.exit(1);
    }
}