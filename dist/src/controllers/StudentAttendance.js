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
exports.getStudentAttendancesByInstitute = void 0;
const sequelize_1 = require("sequelize");
const StudentAttendance_1 = __importDefault(require("../models/StudentAttendance"));
const Student_1 = __importDefault(require("../models/Student"));
const Course_1 = __importDefault(require("../models/Course"));
const Faculty_1 = __importDefault(require("../models/Faculty"));
const getStudentAttendancesByInstitute = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { instituteId } = req.params;
        const { startDate, endDate } = req.query;
        const dateFilter = startDate && endDate ? {
            date: {
                [sequelize_1.Op.between]: [new Date(startDate), new Date(endDate)]
            }
        } : {};
        const attendances = yield StudentAttendance_1.default.findAll({
            where: Object.assign({}, dateFilter),
            include: [
                {
                    model: Student_1.default,
                    required: true,
                    include: [
                        {
                            model: Course_1.default,
                            required: true,
                            where: { institute_id: instituteId },
                        }
                    ],
                },
                {
                    model: Faculty_1.default,
                },
            ],
            order: [['date', 'ASC']],
        });
        res.status(200).json(attendances);
    }
    catch (error) {
        console.error("Error fetching student attendances:", error);
        res.status(500).json({ error: "Error fetching student attendances", message: error.message });
    }
});
exports.getStudentAttendancesByInstitute = getStudentAttendancesByInstitute;
