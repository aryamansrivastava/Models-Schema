import express from "express";
import * as studentController from "../controllers/studentController";

const router = express.Router();

router.get("/", studentController.getAllStudents);
router.get("/:id", studentController.getStudentById);
router.post("/", studentController.createStudent);
router.put("/:id", studentController.updateStudent);
router.delete("/:id", studentController.deleteStudent);
router.get("/today", studentController.getTotalStudentsToday);
export default router;