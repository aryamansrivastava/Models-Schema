import { Request, Response } from "express";
import { Op } from "sequelize";
import StudentAttendance from "../models/StudentAttendance";
import FacultyAttendance from "../models/FacultyAttendance";
import Student from "../models/Student";
import Faculty from "../models/Faculty";
import Course from "../models/Course";

export const getFacultyByInstitute = async (req: Request, res: Response) => {
  try {
    const { instituteId } = req.params;

    const faculty = await Faculty.findAll({
      where: {
        institute_id: instituteId,
      },
    });
    res.status(200).json({
      success: true,
      total: faculty.length,
      data: faculty,
    });
  } catch (error) {
    console.error("Error fetching faculty by institute:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch faculty",
    });
  }
};

export const getAttendanceByInstitute = async (req: Request, res: Response) => {
  try {
    const { instituteId } = req.params;
    const { month, year } = req.query;

    if (!instituteId) {
      res.status(400).json({ error: "Institute ID is required" });
      return;
    }

    const selectedMonth = month ? parseInt(month as string) : new Date().getMonth() + 1;
    const selectedYear = year ? parseInt(year as string) : new Date().getFullYear();

    const firstDayOfMonth = new Date(selectedYear, selectedMonth - 1, 1);
    const lastDayOfMonth = new Date(selectedYear, selectedMonth, 0);

    const dateFilter = {
      date: {
        [Op.between]: [firstDayOfMonth, lastDayOfMonth],
      },
    };

    const studentAttendance: StudentAttendance[] =
      await StudentAttendance.findAll({
        where: { ...dateFilter },
        include: [
          {
            model: Student,
            as: "student",
            include: [
              {
                model: Course,
                as: "courses",
                where: {
                  institute_id: instituteId,
                },
                required: true
              },
            ],
            required:true
          },
        ],
        order: [["date", "ASC"]],
      });

    const facultyAttendance = await FacultyAttendance.findAll({
      where: { ...dateFilter },
      include: [
        {
          model: Faculty,
          as: "faculty",
          where: { institute_id: instituteId },
        },
      ],
      order: [["date", "ASC"]],
    });
    
    res.status(200).json({ studentAttendance, facultyAttendance });
  } catch (error) {
    console.error("Error fetching institute attendance:", error);
    res.status(500).json({ error: "Failed to fetch attendance data" });
  }
};