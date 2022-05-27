import { Sequelize } from "sequelize";
import { config } from "../config/config";
import { UserModel } from "./user";
import { PostModel } from "./post";
import { HashtagModel } from "./hashtag";

const devConfig = config.development;

export const sequelize = new Sequelize(
  devConfig.database,
  devConfig.username,
  devConfig.password,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

export const db = {
  user: UserModel,
  post: PostModel,
  hashtag: HashtagModel,
};
