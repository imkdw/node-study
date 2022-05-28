import { Sequelize, DataTypes, Model } from "sequelize";
import { config } from "../config/config";

const devConfig = config.development;

// db 정의
export const sequelize = new Sequelize(
  devConfig.database,
  devConfig.username,
  devConfig.password,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

// User Model 정의
export class User extends Model {}
User.init(
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
    sequelize: sequelize,
    timestamps: true,
    underscored: false,
    modelName: "User",
    tableName: "users",
    paranoid: true,
    charset: "utf8",
    collate: "utf8_general_ci",
  }
);

// Hashtag Model 정의
export class Hashtag extends Model {}
Hashtag.init(
  {
    title: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize: sequelize,
    timestamps: true,
    underscored: false,
    modelName: "Hasgtag",
    tableName: "hasgtags",
    paranoid: true,
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
  }
);

// Post Model 정의
export class Post extends Model {}
Post.init(
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
    sequelize: sequelize,
    timestamps: true,
    underscored: false,
    modelName: "Post",
    tableName: "posts",
    paranoid: true,
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
  }
);

User.hasMany(Post);
User.belongsToMany(User, {
  foreignKey: "followingId",
  as: "Follwers",
  through: "Follow",
});
User.belongsToMany(User, {
  foreignKey: "followerId",
  as: "Follwings",
  through: "Follow",
});
Post.belongsTo(User);
Post.belongsToMany(Hashtag, { through: "PostHashtag" });
Hashtag.belongsToMany(Post, { through: "PostHashtag" });
