"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const Course_1 = __importDefault(require("./Course"));
class Exam extends sequelize_1.Model {
    static associate(models) {
        Exam.belongsTo(models.Course, { foreignKey: "course_id" });
        Exam.hasMany(models.Result, { foreignKey: "exam_id" });
    }
}
Exam.init({
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    course_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: Course_1.default, key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    subject: sequelize_1.DataTypes.STRING,
    marks: sequelize_1.DataTypes.INTEGER,
    date: sequelize_1.DataTypes.DATE,
    duration: sequelize_1.DataTypes.INTEGER,
}, { sequelize: database_1.sequelize, modelName: "Exam", tableName: "Exams" });
exports.default = Exam;
