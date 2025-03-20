"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Department extends sequelize_1.Model {
}
Department.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    Building: sequelize_1.DataTypes.STRING,
    Budget: sequelize_1.DataTypes.INTEGER,
    Hod: sequelize_1.DataTypes.STRING,
}, {
    sequelize: database_1.sequelize,
    modelName: "Department",
});
exports.default = Department;
