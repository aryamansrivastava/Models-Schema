import { DataTypes, Model } from "sequelize";
import {sequelize} from "../config/database";
import Course from "./Course";

class Exams extends Model {}

Exams.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Course, key: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    subject: DataTypes.STRING,
    marks: DataTypes.INTEGER ,
    date: DataTypes.DATE,
    duration: DataTypes.INTEGER,
  },
  { sequelize, modelName: "Exams" }
);

Exams.belongsTo(Course, { foreignKey: "course_id" });

export default Exams;