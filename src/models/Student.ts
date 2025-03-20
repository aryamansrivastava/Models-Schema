import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
// import Department from "./Department";
import Course from "./Course";

class Student extends Model {}

Student.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Course,
        key: "id",
      },
      onDelete:"CASCADE",
      onUpdate:"CASCADE",
    },
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    semester: DataTypes.STRING,
    cgpa: DataTypes.DECIMAL,
  },
  {sequelize, modelName: "Student", tableName: "Students"}
);

Student.belongsTo(Course, { foreignKey: "course_id" });

export default Student;