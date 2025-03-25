import express from "express";
import { getStudentAttendancesByInstitute } from "../controllers/StudentAttendance";

const router = express.Router();

router.get("/", getStudentAttendancesByInstitute);

export default router;
