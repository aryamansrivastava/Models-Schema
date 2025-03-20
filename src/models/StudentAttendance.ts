import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import Student from "./Student";
import Course from "./Course";
import Faculty from "./Faculty";

class StudentAttendance extends Model {}

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
    faculty_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Faculty,
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    date: { type: DataTypes.DATE, allowNull: false },
    status: { type: DataTypes.ENUM("Present", "Absent"), allowNull: false },
  },
  { sequelize, modelName: "StudentAttendance", tableName: "StudentAttendances", }
);

StudentAttendance.belongsTo(Student, { foreignKey: "student_id" });
StudentAttendance.belongsTo(Course, { foreignKey: "course_id" });
StudentAttendance.belongsTo(Faculty, { foreignKey: "faculty_id" });

export default StudentAttendance;