import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../config/database";
import Course from "./Course";
import Institute from "./Institute";

class Faculty extends Model<
  InferAttributes<Faculty>,
  InferCreationAttributes<Faculty>
> {
  declare id: number;
  declare course_id: number;
  declare institute_id: number;
  declare name: string;
  declare email: string;
  declare qualification: string;
  declare course: number;
  declare specialization: number;
  declare experience: number;
  declare salary: number;

  static associate(models: any) {
    Faculty.belongsTo(models.Course, { foreignKey: "course_id" });
    Faculty.belongsTo(models.Institute, { foreignKey: "institute_id" });
    Faculty.hasMany(models.FacultyAttendance, { foreignKey: "faculty_id" });
    Faculty.hasMany(models.Result, { foreignKey: "faculty_id" });
  }
}

Faculty.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    course_id: {
      type: DataTypes.INTEGER,
      references: { model: Course, key: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    institute_id: {
      type: DataTypes.INTEGER,
      references: { model: Institute, key: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    qualification: DataTypes.STRING,
    course: DataTypes.STRING,
    specialization: DataTypes.STRING,
    experience: DataTypes.INTEGER,
    salary: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "Faculty",
    tableName: "Faculty",
    timestamps: false,
  }
);

// Faculty.belongsTo(Course, { foreignKey: "course_id" });
// Faculty.belongsTo(Institute, { foreignKey: "institute_id" });
// Faculty.hasMany(FacultyAttendance, { foreignKey: "faculty_id" });
// Faculty.hasMany(Result, { foreignKey: "faculty_id" });

export default Faculty;