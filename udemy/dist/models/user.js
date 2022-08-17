"use strict";
exports.__esModule = true;
var sequelize_1 = require("sequelize");
var database_1 = require("../util/database");
var User = database_1.sequelize.define("user", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING
    },
    email: {
        type: sequelize_1.DataTypes.STRING
    }
});
exports["default"] = User;
//# sourceMappingURL=user.js.map