"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const Institute_1 = __importDefault(require("./Institute"));
class Course extends sequelize_1.Model {
    static associate(models) {
        Course.belongsTo(models.Institute, { foreignKey: "institute_id" });
        Course.hasMany(models.Student, { foreignKey: "course_id" });
        Course.hasMany(models.Exam, { foreignKey: "course_id" });
        Course.hasMany(models.Faculty, { foreignKey: "course_id" });
    }
}
Course.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    institute_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: Institute_1.default,
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
    },
    fees: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    duration: {
        type: sequelize_1.DataTypes.INTEGER,
    },
}, {
    sequelize: database_1.sequelize,
    modelName: "Course",
    tableName: "Courses",
    timestamps: false,
});
exports.default = Course;
