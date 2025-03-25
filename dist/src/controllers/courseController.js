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
exports.getCourseById = exports.getCoursesByInstitute = exports.createCourse = exports.getAllCourses = void 0;
const Course_1 = __importDefault(require("../models/Course"));
const Exam_1 = __importDefault(require("../models/Exam"));
const Faculty_1 = __importDefault(require("../models/Faculty"));
const Institute_1 = __importDefault(require("../models/Institute"));
const Student_1 = __importDefault(require("../models/Student"));
const getAllCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield Course_1.default.findAll();
        res.status(200).json(courses);
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching courses" });
    }
});
exports.getAllCourses = getAllCourses;
const createCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield Course_1.default.create(req.body);
        res.status(201).json(course);
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ error: "Error creating course" });
    }
});
exports.createCourse = createCourse;
const getCoursesByInstitute = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        console.log("Received Institute ID:", id);
        if (isNaN(Number(id))) {
            console.error("Invalid Institute ID:", id);
            res.status(400).json({ error: "Invalid institute ID" });
            return;
        }
        const institute = yield Institute_1.default.findByPk(id);
        if (!institute) {
            console.error("Institute not found with ID:", id);
            res.status(404).json({ error: "Institute not found" });
            return;
        }
        const courses = yield Course_1.default.findAll({
            where: { institute_id: id },
        });
        if (courses.length === 0) {
            console.warn("No courses found for institute ID:", id);
            res.status(404).json({ message: "No courses found for this institute" });
            return;
        }
        console.log("Fetched Courses:", courses);
        res.json(courses);
    }
    catch (error) {
        console.error("Error fetching courses by institute:", error);
        res.status(500).json({ error: "Error fetching courses" });
    }
});
exports.getCoursesByInstitute = getCoursesByInstitute;
const getCourseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (isNaN(Number(id))) {
            res.status(400).json({ error: "Invalid course ID" });
            return;
        }
        const course = yield Course_1.default.findOne({
            where: { id },
            include: [{ model: Institute_1.default }, { model: Faculty_1.default }, { model: Student_1.default }, { model: Exam_1.default }],
        });
        if (!course) {
            res.status(404).json({ message: "Course not found" });
            return;
        }
        res.json(course);
    }
    catch (error) {
        console.error("Error fetching course by ID:", error);
        res.status(500).json({ error: error.message || "Error fetching course" });
    }
});
exports.getCourseById = getCourseById;
