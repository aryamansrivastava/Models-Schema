import { Request, Response } from "express";
import Course from "../models/Course";
import Faculty from "../models/Faculty";
import Student from "../models/Student";
import StudentAttendance from "../models/StudentAttendance";

export const getStudentAttendanceById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const attendance = await StudentAttendance.findOne({
            where: { id },
            include: [
                { model: Student }, 
                { model: Course }, 
                { model: Faculty }, 
            ],
        });

        if (!attendance) {
            return res.status(404).json({ message: "Attendance record not found" });
        }
        res.json(attendance);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
};