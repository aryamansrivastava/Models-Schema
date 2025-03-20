import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../config/database";
import Student from "./Student";
import Course from "./Course";
import Exams from "./Exams";

class Result extends Model<
  InferAttributes<Result>,
  InferCreationAttributes<Result>
> {
  declare id: number;
  declare student_id: number;
  declare course_id: number;
  declare exam_id: number;
  declare marks: number;
  declare result_Date: Date;
  declare cgpa: number;

  static associate(models: any) {
    Result.belongsTo(models.Student, { foreignKey: "student_id" });
    Result.belongsTo(models.Course, { foreignKey: "course_id" });
    Result.belongsTo(models.Exams, { foreignKey: "exam_id" });
  }
}

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
    cgpa: {
      type: DataTypes.DECIMAL(3, 2),
      allowNull: false,
    },
  },
  { sequelize, modelName: "Result" }
);

export default Result;