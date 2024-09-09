import { DataTypes, Model } from "sequelize";
import sequelize from "../services/SequelizeClient.js";
import User from "./user.js";

export default class Task extends Model {}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    task_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    discription: DataTypes.STRING,
    complite: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    userEmail: {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: "email",
      },
      allowNull: false,
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "Task",
    timestamps: true,
  }
);
