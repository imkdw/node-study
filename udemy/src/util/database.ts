import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("node_complete", "root", "1234", {
  dialect: "mysql",
  host: "localhost",
});
