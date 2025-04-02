import { sequelize } from "./config/database"
import express from "express"
import cors from "cors";

import "./models/Course"
import "./models/Faculty"
import "./models/Student"
import "./models/StudentAttendance"
import "./models/FacultyAttendance"
import "./models/Institute"
import "./models/Result"
import "./models/Exam"

import studentRoutes from "./routes/studentRoutes";
import courseRoutes from "./routes/courseRoutes";
import facultyRoutes from "./routes/facultyRoutes";
import instituteRoutes from "./routes/instituteRoutes";
import resultRoutes from "./routes/resultRoutes";
import studentAttendanceRoutes from "./routes/studentAttendanceRoutes"

const app = express();
const PORT = 5000;

app.use(
  cors({
    origin: "http://localhost:3000", 
    methods: ["GET", "POST", "PUT", "DELETE", 'PATCH'], 
    allowedHeaders: ["Content-Type", "Authorization"], 
  })
);

app.use(express.json());

app.use("/api/students", studentRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/faculties", facultyRoutes);
app.use("/api/institutes", instituteRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/attendances", studentAttendanceRoutes);

(async () => {
  try {
    await sequelize.sync();
    console.log("Database connected successfully!");

    app.listen(PORT, () => {
      console.log("Server running at Port : 5000");
    });
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
})();