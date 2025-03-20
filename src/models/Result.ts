import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import Student from "./Student";
import Course from "./Course";
import Exams from "./Exams";

class Result extends Model {}

Result.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Student,
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Course,
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    exam_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Exams,
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    marks: DataTypes.INTEGER,
    result_Date: DataTypes.DATE,
    cgpa: DataTypes.DECIMAL,
  },
  { sequelize, modelName: "Result" }
);

Result.belongsTo(Student, {foreignKey:"student_id"});
Result.belongsTo(Course, {foreignKey:"course_id"});
Result.belongsTo(Exams, {foreignKey:"exam_id"});

export default Result;