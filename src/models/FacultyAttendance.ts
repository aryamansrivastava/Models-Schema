import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import Faculty from "./Faculty";
import Course from "./Course";

class FacultyAttendance extends Model {}

FacultyAttendance.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    date: DataTypes.DATE,
    status: DataTypes.ENUM("Present", "Absent"),
  },
  { sequelize, modelName: "FacultyAttendance", tableName: "FacultyAttendances"}
);

FacultyAttendance.belongsTo(Faculty, {foreignKey: "faculty_id"});
FacultyAttendance.belongsTo(Course, {foreignKey: "course_id"});

export default FacultyAttendance;