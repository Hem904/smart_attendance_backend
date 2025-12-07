import mongoose, { Schema, Document, Types } from "mongoose";

export interface ISession extends Document {
    course: Types.ObjectId;
    date: Date;
    topic?: string;
}

const SessionSchema = new Schema<ISession>(
    {
        course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
        date: { type: Date, required: true, default: Date.now },
        topic: { type: String }
    },
    { timestamps: true }
);

export const Session = mongoose.model<ISession>("Session", SessionSchema);
