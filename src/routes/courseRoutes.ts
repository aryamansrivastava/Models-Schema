import express from "express";
import * as courseController from "../controllers/courseController";

const router = express.Router();

router.get("/", courseController.getAllCourses);
router.post("/", courseController.createCourse);
router.get("/institutes/:id", courseController.getCoursesByInstitute);

export default router;
