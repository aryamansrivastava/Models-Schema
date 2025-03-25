"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const Course_1 = __importDefault(require("./Course"));
const Institute_1 = __importDefault(require("./Institute"));
class Faculty extends sequelize_1.Model {
    static associate(models) {
        Faculty.belongsTo(models.Course, { foreignKey: "course_id" });
        Faculty.belongsTo(models.Institute, { foreignKey: "institute_id" });
        Faculty.hasMany(models.FacultyAttendance, { foreignKey: "faculty_id" });
        Faculty.hasMany(models.Result, { foreignKey: "faculty_id" });
        Faculty.hasMany(models.StudentAttendance, { foreignKey: "faculty_id" });
    }
}
Faculty.init({
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    course_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: { model: Course_1.default, key: "id" },
        onDelete: "CASCADE",
    },
    institute_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: { model: Institute_1.default, key: "id" },
    },
    name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    email: { type: sequelize_1.DataTypes.STRING, unique: true, allowNull: false },
    qualification: sequelize_1.DataTypes.STRING,
    course: sequelize_1.DataTypes.STRING,
    specialization: sequelize_1.DataTypes.STRING,
    experience: sequelize_1.DataTypes.INTEGER,
    salary: sequelize_1.DataTypes.INTEGER,
}, {
    sequelize: database_1.sequelize,
    modelName: "Faculty",
    tableName: "Faculty",
    timestamps: false,
});
exports.default = Faculty;
