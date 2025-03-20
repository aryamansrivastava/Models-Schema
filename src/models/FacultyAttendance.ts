import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../config/database";
import Course from "./Course";

enum AttendanceStatus {
  PRESENT = "Present",
  ABSENT = "Absent",
  LEAVE = "Leave",
}

class FacultyAttendance extends Model<
  InferAttributes<FacultyAttendance>,
  InferCreationAttributes<FacultyAttendance>
> {
  declare id: number;
  declare faculty_id: number;
  declare course_id: number;
  declare date: Date;
  declare status: AttendanceStatus;

  static associate(models: any) {
    FacultyAttendance.belongsTo(models.Faculty, { foreignKey: "faculty_id" });
FacultyAttendance.hasMany(models.Course, { foreignKey: "course_id" });
  }
}

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
        model: {
          tableName: 'Faculty'
        },
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
    status: DataTypes.ENUM(...Object.values(AttendanceStatus)),
  },
  { sequelize, modelName: "FacultyAttendance", tableName: "FacultyAttendances"}
);

export default FacultyAttendance;