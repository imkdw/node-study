"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.promisePool = void 0;
var mysql2_1 = __importDefault(require("mysql2"));
var pool = mysql2_1["default"].createPool({
    host: "localhost",
    user: "root",
    database: "node_complete",
    password: "1234"
});
exports.promisePool = pool.promise();
//# sourceMappingURL=database.js.map