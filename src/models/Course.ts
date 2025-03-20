import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../config/database";
import Institute from "./Institute";

class Course extends Model<
  InferAttributes<Course>,
  InferCreationAttributes<Course>
> {
  declare id: number;
  declare institute_id: number;
  declare name: string;
  declare fees: number;
  declare duration: number;

  static associate(models: any) {
    Course.belongsTo(models.Institute, { foreignKey: "institute_id" });
    Course.hasMany(models.Student, { foreignKey: "course_id" });
    Course.hasMany(models.Exams, { foreignKey: "course_id" });
    Course.hasMany(models.Faculty, { foreignKey: "course_id" });
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