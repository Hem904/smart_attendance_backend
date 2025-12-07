import mongoose, { Schema, Document } from "mongoose";

export type UserRole = "student" | "professor" | "university";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    faceRegistered: boolean;
}

const UserSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true, lowercase: true },
        password: { type: String, required: true },
        role: {
            type: String,
            enum: ["student", "professor", "university"],
            required: true
        },
        faceRegistered: { type: Boolean, default: false } // 👈 new
    },
    { timestamps: true }
);

export const User = mongoose.model<IUser>("User", UserSchema);
