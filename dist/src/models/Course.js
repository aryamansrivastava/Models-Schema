"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const Department_1 = __importDefault(require("./Department"));
class Course extends sequelize_1.Model {
}
Course.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    Department_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: Department_1.default,
            key: "id",
        },
    },
    Course_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
    },
    Fees: {
        type: sequelize_1.DataTypes.BIGINT,
    },
    Duration: {
        type: sequelize_1.DataTypes.INTEGER,
    },
}, {
    sequelize: database_1.sequelize,
    modelName: "Course",
    tableName: "Courses",
    timestamps: false,
});
Course.belongsTo(Department_1.default, { foreignKey: "Department_id" });
exports.default = Course;
