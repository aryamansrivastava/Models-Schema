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
exports.deleteFaculty = exports.updateFaculty = exports.createFaculty = exports.getFacultyById = exports.getAllFaculties = void 0;
const Faculty_1 = __importDefault(require("../models/Faculty"));
const Course_1 = __importDefault(require("../models/Course"));
const FacultyAttendance_1 = __importDefault(require("../models/FacultyAttendance"));
const Institute_1 = __importDefault(require("../models/Institute"));
const getAllFaculties = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const faculties = yield Faculty_1.default.findAll();
        res.status(200).json(faculties);
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching faculties" });
    }
});
exports.getAllFaculties = getAllFaculties;
const getFacultyById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const faculty = yield Faculty_1.default.findOne({
            where: { id },
            include: [
                { model: Course_1.default },
                { model: Institute_1.default },
                { model: FacultyAttendance_1.default },
            ],
        });
        if (!faculty) {
            res.status(404).json({ error: "Faculty not found" });
            return;
        }
        res.status(200).json(faculty);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching faculty" });
    }
});
exports.getFacultyById = getFacultyById;
const createFaculty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const faculty = yield Faculty_1.default.create(req.body);
        res.status(201).json(faculty);
    }
    catch (error) {
        console.error("Error creating faculty:", error);
        res.status(500).json({ error: "Error creating faculty" });
    }
});
exports.createFaculty = createFaculty;
const updateFaculty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const faculty = yield Faculty_1.default.findByPk(req.params.id);
        if (!faculty) {
            res.status(404).json({ error: "Faculty not found" });
            return;
        }
        yield faculty.update(req.body);
        res.status(200).json(faculty);
    }
    catch (error) {
        res.status(500).json({ error: "Error updating faculty" });
    }
});
exports.updateFaculty = updateFaculty;
const deleteFaculty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const faculty = yield Faculty_1.default.findByPk(req.params.id);
        if (!faculty) {
            res.status(404).json({ error: "Faculty not found" });
            return;
        }
        yield faculty.destroy();
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: "Error deleting faculty" });
    }
});
exports.deleteFaculty = deleteFaculty;
