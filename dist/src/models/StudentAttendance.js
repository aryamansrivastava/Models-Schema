"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const Student_1 = __importDefault(require("./Student"));
const Faculty_1 = __importDefault(require("./Faculty"));
class StudentAttendance extends sequelize_1.Model {
    static associate(models) {
        StudentAttendance.belongsTo(models.Student, { foreignKey: "student_id" });
        StudentAttendance.belongsTo(models.Faculty, { foreignKey: "faculty_id" });
    }
}
StudentAttendance.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    student_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Student_1.default,
            key: "id",
        },
        onDelete: "CASCADE",
    },
    faculty_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Faculty_1.default,
            key: "id",
        },
    },
    date: { type: sequelize_1.DataTypes.DATE, allowNull: false },
    status: sequelize_1.DataTypes.TINYINT,
}, {
    sequelize: database_1.sequelize,
    modelName: "StudentAttendance",
    tableName: "StudentAttendances",
    timestamps: true,
});
exports.default = StudentAttendance;
