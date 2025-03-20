"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const Student_1 = __importDefault(require("./Student"));
const Course_1 = __importDefault(require("./Course"));
class StudentAttendance extends sequelize_1.Model {
}
StudentAttendance.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
    },
    student_id: sequelize_1.DataTypes.INTEGER,
    Course_id: sequelize_1.DataTypes.INTEGER,
    data: sequelize_1.DataTypes.DATE,
    status: sequelize_1.DataTypes.ENUM("Present", "Absent"),
}, { sequelize: database_1.sequelize, modelName: "StudentAttendance" });
StudentAttendance.belongsTo(Student_1.default, { foreignKey: "student_id" });
StudentAttendance.belongsTo(Course_1.default, { foreignKey: "Course_id" });
exports.default = StudentAttendance;
