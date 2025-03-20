import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../config/database";
import Student from "./Student";
import Course from "./Course";
import Faculty from "./Faculty";

enum AttendanceStatus {
  PRESENT = "Present",
  ABSENT = "Absent",
  LEAVE = "Leave",
}

class StudentAttendance extends Model<
InferAttributes<StudentAttendance>,
InferCreationAttributes<StudentAttendance>
> {
declare id: number;
declare student_id: number;
declare course_id: number;
declare faculty_id: number;
declare date: Date;
declare status: AttendanceStatus;

static associate(models: any) {
  StudentAttendance.belongsTo(models.Student, {foreignKey: "student_id"});
  StudentAttendance.belongsTo(models.Course, {foreignKey: "course_id"});
  StudentAttendance.belongsTo(models.Faculty, {foreignKey: "faculty_id"});
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
    status: DataTypes.ENUM(...Object.values(AttendanceStatus)),
  },
  { sequelize, modelName: "StudentAttendance", tableName: "StudentAttendances", }
);

StudentAttendance.belongsTo(Student, {foreignKey: "student_id"});
StudentAttendance.belongsTo(Course, {foreignKey: "course_id"});
StudentAttendance.belongsTo(Faculty, {foreignKey: "faculty_id"});

export default StudentAttendance;