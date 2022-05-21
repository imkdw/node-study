import { Sequelize } from "sequelize/types";
import { config } from "../config/config";

export const sequelize = new Sequelize(
  config.dev.database,
  config.dev.username,
  config.dev.password,
  {
    host: config.dev.host,
    dialect: "mysql",
  }
);
