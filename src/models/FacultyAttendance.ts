import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../config/database";
import Faculty from "./Faculty";

class FacultyAttendance extends Model<
  InferAttributes<FacultyAttendance>,
  InferCreationAttributes<FacultyAttendance>
> {
  declare id: number;
  declare faculty_id: number;
  declare date: Date;
  declare status: number;

  static associate(models: any) {
    FacultyAttendance.belongsTo(models.Faculty, { foreignKey: "faculty_id", as: "faculty"});
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
        model: Faculty,
        key: "id",
      },
      onDelete: "CASCADE",
      // onUpdate: "CASCADE",
    },
    date: DataTypes.DATE,
    status: DataTypes.TINYINT,
  },
  { sequelize, modelName: "FacultyAttendance", tableName: "FacultyAttendances", timestamps:true }
);

export default FacultyAttendance;