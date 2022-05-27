import { DataTypes } from "sequelize/types";
import { sequelize } from ".";

export const PostModel = sequelize.define(
  "Post",
  {
    content: {
      type: DataTypes.STRING(140),
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
  },
  {
    timestamps: true,
    underscored: false,
    modelName: "Post",
    tableName: "posts",
    paranoid: true,
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
  }
);
