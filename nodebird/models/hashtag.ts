import { DataTypes } from "sequelize/types";
import { sequelize } from ".";

export const HashtagModel = sequelize.define(
  "Hashtag",
  {
    title: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: true,
    underscored: false,
    modelName: "Hasgtag",
    tableName: "hasgtags",
    paranoid: true,
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
  }
);
