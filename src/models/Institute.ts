import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../config/database";

class Institute extends Model<
  InferAttributes<Institute>,
  InferCreationAttributes<Institute>
> {
  declare id: number;
  declare name: string;
  declare email: string;
  declare address: Text;
  declare website: string;
  declare contact_No: string;
  declare affiliation: string;
  declare established: Date;

  static associate(models: any) {
    Institute.hasMany(models.Course, { foreignKey: "institute_id" });
    Institute.hasMany(models.Faculty, { foreignKey: "institute_id" });
  }
}

Institute.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    address: DataTypes.TEXT,
    website: DataTypes.STRING,
    contact_No: DataTypes.STRING,
    affiliation: DataTypes.STRING,
    established: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "Institute",
    tableName: "Institute",
    timestamps: false,
  }
);

export default Institute;
