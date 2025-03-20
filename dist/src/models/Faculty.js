"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const Course_1 = __importDefault(require("./Course"));
class Faculty extends sequelize_1.Model {
}
Faculty.init({
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    faculty_id: sequelize_1.DataTypes.INTEGER,
    Course_id: sequelize_1.DataTypes.INTEGER,
    name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    email: { type: sequelize_1.DataTypes.STRING, unique: true, allowNull: false },
    Qualification: sequelize_1.DataTypes.STRING,
    course: sequelize_1.DataTypes.STRING,
    specialization: sequelize_1.DataTypes.STRING,
    experience: sequelize_1.DataTypes.INTEGER,
    salary: sequelize_1.DataTypes.INTEGER,
}, {
    sequelize: database_1.sequelize,
    modelName: 'Faculty',
    timestamps: false
});
Faculty.belongsTo(Course_1.default, { foreignKey: "Course_id" });
exports.default = Faculty;
