import { Request, Response } from "express";
import Student from "../models/Student";
import { Op } from "sequelize";
import Course from "../models/Course";
import Result from "../models/Result";
import StudentAttendance from "../models/StudentAttendance";

export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const students = await Student.findAll();
    const totalStudents = await Student.count();

    res.status(200).json({ total: totalStudents, students });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching students", err });
  }
};

export const getStudentCount = async (req: Request, res: Response) => {
  try{
    const totalStudents = await Student.count();
    res.status(200).json({
      success: true,
      message: "OK",
      data: {total: totalStudents}
    });
  }catch(error: any){
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message || error.toString()
    });
    return;
  }
}

export const getStudentsByInstitute = async (req: Request, res: Response) => {
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

    const students = await Student.findAll({
      where: { ...dateFilter },
      include: [
        {
          model: Course,
          as: "courses",
          where: { institute_id: instituteId },
          attributes: ["id", "name"],
        },
      ],
      order: ["createdAt"],
    });

    const totalStudents = await Student.count({
      where: { ...dateFilter },
      include: [
        {
          model: Course,
          as: "courses",
          where: { institute_id: instituteId },
          attributes: ["id", "name"],
        },
      ],
    });
    res.status(200).json({ students, total: totalStudents });
  } 
  catch (error: any) {
    console.error("Error fetching student of Institute: ", error);
    res.status(500).json({ message: "Failed to fetch Students",error: error.message || error.toString() });
  }
};


export const getStudentCountByInstitute = async (req: Request, res: Response) => {
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

    const totalStudents = await Student.count({
      where: { ...dateFilter },
      include: [
        {
          model: Course,
          as: "courses",
          where: { institute_id: instituteId },
          attributes: ["id", "name"],
        },
      ],
    });
    res.status(200).json({ total: totalStudents });
  } 
  catch (error: any) {
    console.error("Error fetching student of Institute: ", error);
    res.status(500).json({ message: "Failed to fetch Students",error: error.message || error.toString() });
  }
};

// export const getStudentById = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const student = await Student.findOne({
//       where: { id },
//       include: [
//         { model: Course },
//         { model: StudentAttendance },
//         { model: Result },
//       ],
//     });
//     if (!student) {
//       res.status(404).json({ error: "Student not found" });
//       return;
//     }
//     res.status(200).json(student);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Error fetching student" });
//   }
// };

export const createStudent = async (req: Request, res: Response) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: "Error creating student" });
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      res.status(404).json({ error: "Student not found" });
      return;
    }

    await student.update(req.body);
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ error: "Error updating student" });
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      res.status(404).json({ error: "Student not found" });
      return;
    }
    await student.destroy();
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting student" });
  }
};
export function getAttendanceByInstitute(arg0: string, getAttendanceByInstitute: any) {
    throw new Error("Function not implemented.");
}

