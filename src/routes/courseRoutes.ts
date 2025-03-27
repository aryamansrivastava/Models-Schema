import express from "express";
import * as courseController from "../controllers/courseController";

const router = express.Router();

router.get("/", courseController.getAllCourses);
router.post("/", courseController.createCourse);
router.get("/institutes/:id", courseController.getCoursesByInstitute);
router.get("/:courseId/students", courseController.getStudentsByCourseId);
router.get("/:courseId/faculties", courseController.getFacultyByCourseId);

export default router;