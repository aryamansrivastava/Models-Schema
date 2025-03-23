import express from "express";
import { getStudentAttendancesByInstitute } from "../controllers/StudentAttendance";

const router = express.Router();

router.get("/institute/:instituteId", getStudentAttendancesByInstitute);

export default router;
