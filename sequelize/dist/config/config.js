"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.config = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
exports.config = {
    dev: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DBNAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "mysql"
    }
};
