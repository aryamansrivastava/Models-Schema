"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const Faculty_1 = __importDefault(require("./Faculty"));
class FacultyAttendance extends sequelize_1.Model {
    static associate(models) {
        FacultyAttendance.belongsTo(models.Faculty, { foreignKey: "faculty_id" });
    }
}
FacultyAttendance.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    faculty_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Faculty_1.default,
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    date: sequelize_1.DataTypes.DATE,
    status: sequelize_1.DataTypes.TINYINT,
}, { sequelize: database_1.sequelize, modelName: "FacultyAttendance", tableName: "FacultyAttendances", timestamps: true });
exports.default = FacultyAttendance;
