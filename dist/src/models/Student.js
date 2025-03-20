"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Student extends sequelize_1.Model {
}
Student.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
    },
    name: sequelize_1.DataTypes.STRING,
    email: sequelize_1.DataTypes.STRING,
    EnrolledCourses: sequelize_1.DataTypes.STRING,
    Department: sequelize_1.DataTypes.STRING,
    Semester: sequelize_1.DataTypes.STRING,
    CGPA: sequelize_1.DataTypes.DECIMAL,
}, { sequelize: database_1.sequelize, modelName: "Student" });
exports.default = Student;
