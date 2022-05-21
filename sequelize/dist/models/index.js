"use strict";
exports.__esModule = true;
exports.sequelize = void 0;
var types_1 = require("sequelize/types");
var config_1 = require("../config/config");
exports.sequelize = new types_1.Sequelize(config_1.config.dev.database, config_1.config.dev.username, config_1.config.dev.password, {
    host: config_1.config.dev.host,
    dialect: "mysql"
});
