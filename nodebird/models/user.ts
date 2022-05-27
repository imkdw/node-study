import { DataTypes } from "sequelize/types";
import { sequelize } from ".";

export const UserModel = sequelize.define(
  "User",
  {
    email: {
      type: DataTypes.STRING(40),
      allowNull: true,
      unique: true,
    },
    nick: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    provider: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: "local",
    },
    snsId: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
  },
  {
    timestamps: true,
    underscored: false,
    modelName: "User",
    tableName: "users",
    paranoid: true,
    charset: "utf-8",
    collate: "utf8_general_ci",
  }
);
