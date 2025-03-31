import express from "express";
import * as facultyController from "../controllers/facultyController"

const router = express.Router();

router.get("/", facultyController.getAllFaculties);
router.get('/:instituteId', facultyController.getFacultiesByInstitute);
router.post("/", facultyController.createFaculty);
router.put("/:id", facultyController.updateFaculty);
router.delete("/:id", facultyController.deleteFaculty);

export default router;