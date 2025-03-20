import express from "express";
import * as courseController from "../controllers/courseController";

const router = express.Router();

router.get("/", courseController.getAllCourses);
router.post("/", courseController.createCourse);

export default router;
