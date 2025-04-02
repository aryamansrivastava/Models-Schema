"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./config/database");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("./models/Course");
require("./models/Faculty");
require("./models/Student");
require("./models/StudentAttendance");
require("./models/FacultyAttendance");
require("./models/Institute");
require("./models/Result");
require("./models/Exam");
const studentRoutes_1 = __importDefault(require("./routes/studentRoutes"));
const courseRoutes_1 = __importDefault(require("./routes/courseRoutes"));
const facultyRoutes_1 = __importDefault(require("./routes/facultyRoutes"));
const instituteRoutes_1 = __importDefault(require("./routes/instituteRoutes"));
const resultRoutes_1 = __importDefault(require("./routes/resultRoutes"));
const studentAttendanceRoutes_1 = __importDefault(require("./routes/studentAttendanceRoutes"));
const app = (0, express_1.default)();
const PORT = 5000;
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express_1.default.json());
app.use("/api/students", studentRoutes_1.default);
app.use("/api/courses", courseRoutes_1.default);
app.use("/api/faculties", facultyRoutes_1.default);
app.use("/api/institutes", instituteRoutes_1.default);
app.use("/api/results", resultRoutes_1.default);
app.use("/api/attendances", studentAttendanceRoutes_1.default);
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database_1.sequelize.sync();
        console.log("Database connected successfully!");
        app.listen(PORT, () => {
            console.log("Server running at Port : 5000");
        });
    }
    catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
}))();
