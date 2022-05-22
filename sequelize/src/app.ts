import { Sequelize, DataTypes, Model } from "sequelize";
const sequelize = new Sequelize("sequelize", "root", "1234", {
  host: "localhost",
  dialect: "mysql",
  define: {
    freezeTableName: true, // 테이블 이름 자동추론을 비활성화
  },
});

export const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
  },
});
