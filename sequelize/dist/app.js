"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize("sequelize", "root", "1234", {
    host: "localhost",
    dialect: "mysql",
    define: {
        freezeTableName: true, // 테이블 이름 자동추론을 비활성화
    },
});
exports.User = sequelize.define("User", {
    name: {
        type: sequelize_1.DataTypes.STRING,
    },
});
//# sourceMappingURL=app.js.map