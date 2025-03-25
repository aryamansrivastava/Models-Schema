"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Institute extends sequelize_1.Model {
    static associate(models) {
        Institute.hasMany(models.Course, { foreignKey: "institute_id" });
        Institute.hasMany(models.Faculty, { foreignKey: "institute_id" });
    }
}
Institute.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    email: { type: sequelize_1.DataTypes.STRING, unique: true, allowNull: false },
    address: sequelize_1.DataTypes.TEXT,
    contact: sequelize_1.DataTypes.STRING,
    website: sequelize_1.DataTypes.STRING,
    established: sequelize_1.DataTypes.DATE,
}, {
    sequelize: database_1.sequelize,
    modelName: "Institute",
    tableName: "Institute",
    timestamps: false,
});
exports.default = Institute;
