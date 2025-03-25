import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../config/database";
import Student from "./Student";
import Faculty from "./Faculty";
import db from "../models/index";

class StudentAttendance extends Model<
  InferAttributes<StudentAttendance>,
  InferCreationAttributes<StudentAttendance>
> {
  declare id: number;
  declare student_id: number;
  declare faculty_id: number;
  declare date: Date;
  declare status: number;

  static associate(models: any) {
    StudentAttendance.belongsTo(models.Student, { foreignKey: "student_id", as: "student" });
    StudentAttendance.belongsTo(models.Faculty, { foreignKey: "faculty_id", as: "faculty" });
  }
}

StudentAttendance.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Student,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    faculty_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Faculty,
        key: "id",
      },
    },
    date: { type: DataTypes.DATE, allowNull: false },
    status: DataTypes.TINYINT,
  },
  {
    sequelize,
    modelName: "StudentAttendance",
    tableName: "StudentAttendances",
    timestamps: true,
  }
);

export default StudentAttendance;