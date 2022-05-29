"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.db = void 0;
var mysql_1 = __importDefault(require("mysql"));
var conn = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "1234",
    database: "passport"
};
exports.db = mysql_1["default"].createConnection(conn);
//# sourceMappingURL=db.js.map