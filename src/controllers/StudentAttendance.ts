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
    const { startDate, endDate } = req.query;

    if (!instituteId) {
      res.status(400).json({ error: "Institute ID is required" });
      return;
    }

    const dateFilter =
      startDate && endDate
        ? {
            date: {
              [Op.between]: [
                new Date(startDate as string),
                new Date(endDate as string),
              ],
            },
          }
        : {};

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
              },
            ],
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