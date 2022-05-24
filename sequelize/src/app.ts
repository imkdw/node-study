import { Sequelize, DataTypes, Model } from "sequelize";
const sequelize = new Sequelize("sequelize", "root", "1234", {
  host: "localhost",
  dialect: "mysql",
  define: {
    freezeTableName: true, // 테이블 이름 자동추론을 비활성화
  },
});

export const User = sequelize.define("User", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Post.findAll({
  where: {
    authorId: 2,
    data: 1,
    status: "active",
  },
});
