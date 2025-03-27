import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../config/database";
import Institute from "./Institute";
import db from "../models/index";

class Course extends Model<
  InferAttributes<Course>,
  InferCreationAttributes<Course>
> {
  [x: string]: any;
  declare id: number;
  declare institute_id: number;
  declare name: string;
  declare fees: number;
  declare duration: number;

  static associate(models: any) {
    Course.belongsTo(models.Institute, { foreignKey: "institute_id", as:"institute"});
    Course.hasMany(models.Student, { foreignKey: "course_id", as:"students" });
    Course.hasMany(models.Exam, { foreignKey: "course_id", as:"exams"});
    Course.hasMany(models.Faculty, { foreignKey: "course_id", as:"faculty" });
  }
}

Course.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    institute_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Institute,
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    name: {
      type: DataTypes.STRING,
    },
    fees: {
      type: DataTypes.INTEGER,
    },
    duration: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: "Course",
    tableName: "Courses",
    timestamps: false,
  }
);

export default Course;