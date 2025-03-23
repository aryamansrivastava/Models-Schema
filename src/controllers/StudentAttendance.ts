import { Request, Response } from "express";
import { Op } from "sequelize";
import StudentAttendance from "../models/StudentAttendance";
import Student from "../models/Student";
import Course from "../models/Course";
import Faculty from "../models/Faculty";

export const getStudentAttendancesByInstitute = async (req: Request, res: Response) => {
  try {
    const { instituteId } = req.params;
    const { startDate, endDate } = req.query;

    const dateFilter = startDate && endDate ? {
      date: {
        [Op.between]: [new Date(startDate as string), new Date(endDate as string)]
      }
    } : {};

    const attendances = await StudentAttendance.findAll({
      where: { ...dateFilter },
      include: [
        {
          model: Student,
          required: true,
          include: [
            {
              model: Course,
              required: true,
              where: { institute_id: instituteId },
            }
          ],
        },
        {
          model: Faculty,
        },
      ],
      order: [['date', 'ASC']],
    });
    res.status(200).json(attendances);
  } catch (error: any) {
    console.error("Error fetching student attendances:", error);
    res.status(500).json({ error: "Error fetching student attendances", message: error.message });
  }
};