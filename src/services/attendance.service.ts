import { Session } from "../models/Session";
import { Attendance } from "../models/Attendance";
import { Types } from "mongoose";

export async function createSession(courseId: string, date?: Date, topic?: string) {
    return Session.create({
        course: new Types.ObjectId(courseId),
        date: date || new Date(),
        topic
    });
}

export async function markAttendance(
    sessionId: string,
    studentIds: string[],
    status: "PRESENT" | "ABSENT" | "LATE" = "PRESENT"
) {
    const docs = studentIds.map((id) => ({
        session: new Types.ObjectId(sessionId),
        student: new Types.ObjectId(id),
        status
    }));

    // upsert-like behaviour: ignore duplicates
    const results = [];
    for (const doc of docs) {
        const res = await Attendance.updateOne(
            { session: doc.session, student: doc.student },
            { $setOnInsert: doc },
            { upsert: true }
        );
        results.push(res);
    }

    return results;
}
export async function getSessionsByCourse(courseId: string) {
    return Session.find({ course: courseId })
        .sort({ date: -1 }) // latest first
        .lean()
}