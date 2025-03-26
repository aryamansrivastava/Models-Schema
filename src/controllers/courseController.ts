import { Request, Response } from "express";
import Course from "../models/Course";
import Exam from "../models/Exam";
import Faculty from "../models/Faculty";
import Institute from "../models/Institute";
import Student from "../models/Student";

export const getAllCourses = async (req: Request, res: Response) => {
  try {
    const courses = await Course.findAll();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: "Error fetching courses" });
  }
};

export const createCourse = async (req: Request, res: Response) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Error creating course" });
  }
};

export const getCoursesByInstitute = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log("Received Institute ID:", id);

    if (isNaN(Number(id))) {
      console.error("Invalid Institute ID:", id);
      res.status(400).json({ error: "Invalid institute ID" });
      return;
    }

    const institute = await Institute.findByPk(id);
    if (!institute) {
      console.error("Institute not found with ID:", id);
      res.status(404).json({ error: "Institute not found" });
      return;
    }

    const courses = await Course.findAll({
      where: { institute_id: id },
    });

    if (courses.length === 0) {
      console.warn("No courses found for institute ID:", id);
      res.status(404).json({ message: "No courses found for this institute" });
      return;
    }
    res.json(courses);
  } catch (error) {
    console.error("Error fetching courses by institute:", error);
    res.status(500).json({ error: "Error fetching courses" });
  }
};

export const getCourseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (isNaN(Number(id))) {
      res.status(400).json({ error: "Invalid course ID" });
      return;
    }

    const course = await Course.findOne({
      where: { id },
      include: [{ model: Institute }, { model: Faculty }, { model: Student }, { model: Exam }],
    });

    if (!course) {
      res.status(404).json({ message: "Course not found" });
      return;
    }

    res.json(course);
  } catch (error: any) {
    console.error("Error fetching course by ID:", error);
    res.status(500).json({ error: error.message || "Error fetching course" });
  }
};