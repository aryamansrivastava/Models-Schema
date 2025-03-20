import { Request, Response } from "express";
import Student from "../models/Student";
import Course from "../models/Course";
import Result from "../models/Result";
import StudentAttendance from "../models/StudentAttendance";

export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const students = await Student.findAll();
    res.status(200).json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching students", err });
  }
};

export const getStudentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const student = await Student.findOne({
      where: { id },
      include: [
          { model: Course },           
          { model: StudentAttendance },  
          { model: Result },              
      ],
  });
    if (!student) {
      res.status(404).json({ error: "Student not found" });
      return;
    }
    res.status(200).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching student" });
  }
};

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