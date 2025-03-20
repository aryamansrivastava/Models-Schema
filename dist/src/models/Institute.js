"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Institute extends sequelize_1.Model {
}
Institute.init({
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    email: { type: sequelize_1.DataTypes.STRING, unique: true, allowNull: false },
    address: { type: sequelize_1.DataTypes.TEXT },
    website: { type: sequelize_1.DataTypes.STRING },
    contact_No: { type: sequelize_1.DataTypes.STRING },
    affiliation: { type: sequelize_1.DataTypes.STRING },
    established: { type: sequelize_1.DataTypes.DATE },
}, {
    sequelize: database_1.sequelize,
    modelName: 'Institute',
    timestamps: false,
});
exports.default = Institute;
