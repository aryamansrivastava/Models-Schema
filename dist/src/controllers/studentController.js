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
exports.getTotalStudentsToday = exports.deleteStudent = exports.updateStudent = exports.createStudent = exports.getStudentById = exports.getAllStudents = void 0;
const Student_1 = __importDefault(require("../models/Student"));
const sequelize_1 = require("sequelize");
const Course_1 = __importDefault(require("../models/Course"));
const Result_1 = __importDefault(require("../models/Result"));
const StudentAttendance_1 = __importDefault(require("../models/StudentAttendance"));
const getAllStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield Student_1.default.findAll();
        const totalStudents = yield Student_1.default.count();
        res.status(200).json({ total: totalStudents, students });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error fetching students", err });
    }
});
exports.getAllStudents = getAllStudents;
const getStudentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const student = yield Student_1.default.findOne({
            where: { id },
            include: [
                { model: Course_1.default },
                { model: StudentAttendance_1.default },
                { model: Result_1.default },
            ],
        });
        if (!student) {
            res.status(404).json({ error: "Student not found" });
            return;
        }
        res.status(200).json(student);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching student" });
    }
});
exports.getStudentById = getStudentById;
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = yield Student_1.default.create(req.body);
        res.status(201).json(student);
    }
    catch (error) {
        res.status(400).json({ error: "Error creating student" });
    }
});
exports.createStudent = createStudent;
const updateStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = yield Student_1.default.findByPk(req.params.id);
        if (!student) {
            res.status(404).json({ error: "Student not found" });
            return;
        }
        yield student.update(req.body);
        res.status(200).json(student);
    }
    catch (error) {
        res.status(400).json({ error: "Error updating student" });
    }
});
exports.updateStudent = updateStudent;
const deleteStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = yield Student_1.default.findByPk(req.params.id);
        if (!student) {
            res.status(404).json({ error: "Student not found" });
            return;
        }
        yield student.destroy();
        res.status(200).json({ message: "Student deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Error deleting student" });
    }
});
exports.deleteStudent = deleteStudent;
const getTotalStudentsToday = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date();
        tomorrow.setHours(23, 59, 59, 999);
        const totalStudents = yield Student_1.default.count({
            where: {
                createdAt: {
                    [sequelize_1.Op.between]: [today, tomorrow],
                },
            },
        });
        res.json({ total: totalStudents });
    }
    catch (error) {
        console.error("Error fetching student count:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});
exports.getTotalStudentsToday = getTotalStudentsToday;
