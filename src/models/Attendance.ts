import mongoose, { Schema, Document, Types } from "mongoose";

export type AttendanceStatus = "PRESENT" | "ABSENT" | "LATE";

export interface IAttendance extends Document {
    session: Types.ObjectId;
    student: Types.ObjectId;
    status: AttendanceStatus;
    markedAt: Date;
}

const AttendanceSchema = new Schema<IAttendance>(
    {
        session: { type: Schema.Types.ObjectId, ref: "Session", required: true },
        student: { type: Schema.Types.ObjectId, ref: "User", required: true },
        status: {
            type: String,
            enum: ["PRESENT", "ABSENT", "LATE"],
            default: "PRESENT"
        },
        markedAt: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

// No duplicate attendance per session per student
AttendanceSchema.index({ session: 1, student: 1 }, { unique: true });

export const Attendance = mongoose.model<IAttendance>("Attendance", AttendanceSchema);
