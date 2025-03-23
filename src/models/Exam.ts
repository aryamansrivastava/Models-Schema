import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../config/database";
import Course from "./Course";

class Exam extends Model<
  InferAttributes<Exam>,
  InferCreationAttributes<Exam>
> {
  declare id: number;
  declare course_id: number;
  declare subject: string;
  declare marks: number;
  declare date: Date;
  declare duration: number;

  static associate(models: any) {
    Exam.belongsTo(models.Course, { foreignKey: "course_id" });
    Exam.hasMany(models.Result, { foreignKey: "exam_id" });
  }
}

Exam.init(
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
    marks: DataTypes.INTEGER,
    date: DataTypes.DATE,
    duration: DataTypes.INTEGER,
  },
  { sequelize, modelName: "Exam", tableName: "Exams"}
);

export default Exam;