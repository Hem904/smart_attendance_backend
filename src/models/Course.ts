import mongoose, { Schema, Document, Types } from "mongoose";

export interface ICourse extends Document {
    name: string;
    code: string;
    university: Types.ObjectId;  // User with role "university"
    professor: Types.ObjectId;   // User with role "professor"
    students: Types.ObjectId[];  // Users with role "student"
}

const CourseSchema = new Schema<ICourse>(
    {
        name: { type: String, required: true },
        code: { type: String, required: true, unique: true },
        university: { type: Schema.Types.ObjectId, ref: "User", required: true },
        professor: { type: Schema.Types.ObjectId, ref: "User", required: true },
        students: [{ type: Schema.Types.ObjectId, ref: "User" }]
    },
    { timestamps: true }
);

export const Course = mongoose.model<ICourse>("Course", CourseSchema);
