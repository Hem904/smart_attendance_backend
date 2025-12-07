import { Course } from "../models/Course";
import { Types } from "mongoose";

export async function createCourse(
    name: string,
    code: string,
    universityId: string,
    professorId: string
) {
    return Course.create({
        name,
        code,
        university: new Types.ObjectId(universityId),
        professor: new Types.ObjectId(professorId),
        students: []
    });
}

export async function enrollStudent(courseId: string, studentId: string) {
    return Course.findByIdAndUpdate(
        courseId,
        { $addToSet: { students: studentId } },
        { new: true }
    );
}

export async function getCoursesForStudent(studentId: string) {
    return Course.find({ students: studentId }).populate("professor university");
}

export async function getCoursesForProfessor(professorId: string) {
    return Course.find({ professor: professorId }).populate("university students");
}

export async function getCoursesForUniversity(universityId: string) {
    return Course.find({ university: universityId }).populate("professor students");
}

export async function getAllCourses() {
    return Course.find()
        .populate("professor", "name email")
        .populate("university", "name email")
        .lean()
}