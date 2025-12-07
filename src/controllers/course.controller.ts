import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import {
    createCourse,
    enrollStudent,
    getCoursesForStudent,
    getCoursesForProfessor,
    getCoursesForUniversity, getAllCourses
} from "../services/course.service";

export const createCourseHandler = async (req: AuthRequest, res: Response) => {
    try {
        const { name, code, professorId } = req.body;
        const universityId = req.user!.id;

        const course = await createCourse(name, code, universityId, professorId);
        res.status(201).json(course);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};


export const myCoursesHandler = async (req: AuthRequest, res: Response) => {
    try {
        const { role, id } = req.user!;
        let courses;

        if (role === "student") courses = await getCoursesForStudent(id);
        else if (role === "professor") courses = await getCoursesForProfessor(id);
        else courses = await getCoursesForUniversity(id);

        res.json(courses);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

export const getAllCoursesHandler = async (req: AuthRequest, res: Response) => {
    try {
        const courses = await getAllCourses()
        res.json(courses)
    } catch (err: any) {
        res.status(500).json({ message: err.message || "Failed to fetch courses" })
    }
}

// make sure you already have this (student enroll handler):
export const enrollStudentHandler = async (req: AuthRequest, res: Response) => {
    try {
        const courseId = req.params.courseId
        const studentId = req.user!.id // self-enroll
        const course = await enrollStudent(courseId, studentId)
        res.json(course)
    } catch (err: any) {
        res.status(400).json({ message: err.message })
    }
}
