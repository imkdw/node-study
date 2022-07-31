"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mysql_1 = __importDefault(require("mysql"));
var config_1 = require("./config/config");
var connection = mysql_1["default"].createConnection({
    host: config_1.config.db.host,
    user: config_1.config.db.username,
    password: config_1.config.db.password,
    database: config_1.config.db.database
});
exports["default"] = connection;
//# sourceMappingURL=db.js.map