import { Request, Response } from "express";
import Course from "../models/Course";
import Exams from "../models/Exams";
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

export const getCourseById = async (req: Request, res: Response) => {
  try {
      const { id } = req.params;
      const course = await Course.findOne({
          where: { id },
          include: [
              { model: Institute },  
              { model: Faculty },    
              { model: Student },    
              { model: Exams },      
          ],
      });

      if (!course) {
          res.status(404).json({ message: "Course not found" });
          return;
      }

      res.json(course);
  } catch (error: any) {
      res.status(500).json({ error: error.message });
  }
};