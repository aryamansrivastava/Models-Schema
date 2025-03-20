import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
// import Department from "./Department";
import Institute from "./Institute";

class Course extends Model {}

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
      type: DataTypes.BIGINT,
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

Course.belongsTo(Institute, { foreignKey: "institute_id" });

export default Course;