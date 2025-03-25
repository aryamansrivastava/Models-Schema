"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const Student_1 = __importDefault(require("./Student"));
const Exam_1 = __importDefault(require("./Exam"));
const Faculty_1 = __importDefault(require("./Faculty"));
class Result extends sequelize_1.Model {
    static associate(models) {
        Result.belongsTo(models.Student, { foreignKey: "student_id" });
        Result.belongsTo(models.Course, { foreignKey: "course_id" });
        Result.belongsTo(models.Exam, { foreignKey: "exam_id" });
    }
}
Result.init({
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    student_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Student_1.default,
            key: "id",
        },
        onDelete: "CASCADE",
    },
    exam_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Exam_1.default,
            key: "id",
        },
    },
    faculty_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: Faculty_1.default, key: "id" },
    },
    marks: sequelize_1.DataTypes.INTEGER,
    result_Date: sequelize_1.DataTypes.DATE,
    cgpa: {
        type: sequelize_1.DataTypes.DECIMAL(3, 2),
        allowNull: false,
    },
}, { sequelize: database_1.sequelize, modelName: "Result" });
exports.default = Result;
