import express from "express";
import * as studentController from "../controllers/studentController";

const router = express.Router();

router.get("/", studentController.getAllStudents);
router.get('/count', studentController.getStudentCount);
router.get('/count/:instituteId', studentController.getStudentCountByInstitute);
router.post("/", studentController.createStudent);
router.put("/:id", studentController.updateStudent);
router.delete("/:id", studentController.deleteStudent);
router.get("/:instituteId", studentController.getStudentsByInstitute);

export default router;