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
    console.error("Error fetching courses:", error);
    res.status(500).json({ error: "Error fetching courses" });
  }
};

export const createCourse = async (req: Request, res: Response) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(400).json({ error: "Error creating course" });
  }
};

export const getCoursesByInstitute = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (isNaN(Number(id))) {
      console.error("Invalid Institute ID:", id);
      res.status(400).json({ error: "Invalid institute ID" });
      return;
    }

    const institute = await Institute.findByPk(id);
    if (!institute) {
      console.error("Institute not found with ID:", id);
      res.status(404).json({ error: "Institute not found" });
      return
    }

    const courses = await Course.findAll({
      where: { institute_id: id },
      include: [
        { model: Student, as: "students" },
        { model: Faculty, as: "faculty" },
      ],
    });

    if (courses.length === 0) {
      res.status(404).json({ message: "No courses found for this institute" });
      return
    }

    const formattedCourses = courses.map((course) => ({
      id: course.id,
      name: course.name,
      fees: course.fees,
      duration: course.duration,
      institute: institute.name,
      studentCount: course.students?.length || 0,
      facultyCount: course.faculty?.length || 0,
    }));

    res.status(200).json(formattedCourses);
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
     return 
    }

    const course = await Course.findOne({
      where: { id },
      include: [
        { model: Institute, as: "institute" },
        { model: Student, as: "students" },
        { model: Faculty, as: "faculty" },
        { model: Exam, as: "exams" },
      ],
    });

    if (!course) {
      res.status(404).json({ message: "Course not found" });
      return 
    }

    res.json({
      id: course.id,
      name: course.name,
      fees: course.fees,
      duration: course.duration,
      institute: course.institute?.name || "Unknown",
      studentCount: course.students?.length || 0,
      facultyCount: course.faculty?.length || 0,
      exams: course.exams,
    });
  } catch (error: any) {
    console.error("Error fetching course by ID:", error);
    res.status(500).json({ error: error.message || "Error fetching course" });
  }
};

export const getStudentsByCourseId = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;
    if (isNaN(Number(courseId))) {
     res.status(400).json({ error: "Invalid course ID" });
     return 
    }

    const students = await Student.findAll({
      where: { course_id: courseId },
    });

    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students by course ID:", error);
    res.status(500).json({ error: "Error fetching students" });
  }
};

export const getFacultyByCourseId = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;
    if (isNaN(Number(courseId))) {
      res.status(400).json({ error: "Invalid course ID" });
      return 
    }

    const faculty = await Faculty.findAll({
      where: { course_id: courseId },
    });

    res.status(200).json(faculty);
  } catch (error) {
    console.error("Error fetching faculty by course ID:", error);
    res.status(500).json({ error: "Error fetching faculty" });
  }
}; 