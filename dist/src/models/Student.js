"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const Course_1 = __importDefault(require("./Course"));
class Student extends sequelize_1.Model {
    static associate(models) {
        Student.belongsTo(models.Course, { foreignKey: "course_id" });
        Student.hasMany(models.Result, { foreignKey: "student_id" });
        Student.hasMany(models.StudentAttendance, { foreignKey: "student_id" });
    }
}
Student.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    course_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Course_1.default,
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    name: sequelize_1.DataTypes.STRING,
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    semester: sequelize_1.DataTypes.STRING,
    cgpa: {
        type: sequelize_1.DataTypes.DECIMAL(3, 2),
        allowNull: false,
    },
}, { sequelize: database_1.sequelize, modelName: "Student", tableName: "Students", });
exports.default = Student;
