import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
  import { sequelize } from "../config/database";
  import Course from "./Course";

  class Student extends Model<
  InferAttributes<Student>,
  InferCreationAttributes<Student>
> {
  declare id: number;
  declare course_id: number;
  declare name: string;
  declare email: string;
  declare semester: Date;
  declare cgpa: number;

  static associate(models: any) {
    Student.belongsTo(models.Course, {foreignKey: "course_id", as: "course"});
    Student.hasMany(models.Result, { foreignKey: "student_id", as : "results" }); 
    Student.hasMany(models.StudentAttendance, { foreignKey: "student_id" as "attendances" });
  }
}

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
      cgpa: {
        type: DataTypes.DECIMAL(3, 2),
        allowNull: false,
      },
    },
    {sequelize, modelName: "Student", tableName: "Students",}
  );

  export default Student;