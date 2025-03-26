import express from "express";
import { getAttendanceByInstitute, getFacultyByInstitute } from "../controllers/StudentAttendance";

const router = express.Router();

router.get("/:instituteId",  getAttendanceByInstitute);

router.get("/faculty/:instituteId", getFacultyByInstitute);

export default router;