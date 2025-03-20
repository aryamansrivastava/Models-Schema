import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import Course from "./Course";
import Student from "./Student";

class Institute extends Model {}

Institute.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // student_id: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     references: {
    //       model: Student,
    //       key: "id",
    //     },
    //     onDelete: "CASCADE",
    //     onUpdate: "CASCADE",
    //   },
      // course_id: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: Course,
      //     key: "id",
      //   },
      //   onDelete: "CASCADE",
      //   onUpdate: "CASCADE",
      // },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    address: DataTypes.TEXT,
    website: DataTypes.STRING ,
    contact_No: DataTypes.STRING,
    affiliation: DataTypes.STRING ,
    established: DataTypes.DATE ,
  },
  {
    sequelize,
    modelName: "Institute",
    tableName: "Institute",
    timestamps: false,
  }
);

// Institute.belongsTo(Course, { foreignKey: "course_id" , onUpdate: "CASCADE" });
// Institute.belongsTo(Student, {foreignKey: "student_id" , onUpdate: "CASCADE"});

export default Institute;