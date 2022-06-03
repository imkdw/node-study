"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mysql2_1 = __importDefault(require("mysql2"));
var db = mysql2_1["default"].createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "1234",
    database: "community"
});
exports["default"] = db;
//# sourceMappingURL=db.js.map