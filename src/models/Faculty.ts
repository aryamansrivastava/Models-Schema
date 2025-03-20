import { DataTypes, Model } from 'sequelize';
import {sequelize} from '../config/database';
import Course from './Course';
import Institute from './Institute';

class Faculty extends Model {}

Faculty.init({
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
    qualification: DataTypes.STRING ,
    course: DataTypes.STRING ,
    specialization: DataTypes.STRING,
    experience: DataTypes.INTEGER,
    salary: DataTypes.INTEGER ,
}, {
    sequelize,
    modelName: 'Faculty',
    timestamps: false
});

Faculty.belongsTo(Course, { foreignKey: "course_id" });
Faculty.belongsTo(Institute, { foreignKey: "institute_id" });

export default Faculty;