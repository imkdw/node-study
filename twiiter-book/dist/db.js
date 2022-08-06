"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mysql_1 = __importDefault(require("mysql"));
var config_1 = __importDefault(require("./config/config"));
var connection = mysql_1["default"].createConnection({
    host: config_1["default"].db.host,
    user: config_1["default"].db.username,
    password: config_1["default"].db.password,
    database: config_1["default"].db.database
});
exports["default"] = connection;
//# sourceMappingURL=db.js.map