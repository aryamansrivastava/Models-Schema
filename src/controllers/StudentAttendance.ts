import { Request, Response } from "express";
import { Op } from "sequelize";
import db from "../models/index";

export const getStudentAttendancesByInstitute = async (req: Request, res: Response) => {
  try {
    const { instituteId } = req.params;
    const { startDate, endDate } = req.query;

    const dateFilter = startDate && endDate ? {
      date: {
        [Op.between]: [new Date(startDate as string), new Date(endDate as string)]
      }
    } : {};

    const attendances = await db.models.StudentAttendance.findAll({
        where: { ...dateFilter },
        include: [
            { model: db.models.Student, as: "student" }, 
            { model: db.models.Faculty, as: "faculty" },
          ],
        order: [['date', 'ASC']],
      });
  
      res.status(200).json(attendances);
    } catch (error: any) {
    console.error("Error fetching student attendances:", error);
    res.status(500).json({ error: "Error fetching student attendances", message: error.message });
  }
};