"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.testConnection = void 0;
var mysql_1 = __importDefault(require("mysql"));
exports.testConnection = mysql_1["default"].createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    port: 3306,
    database: 'tesT_twitter_book'
});
//# sourceMappingURL=test_db.js.map