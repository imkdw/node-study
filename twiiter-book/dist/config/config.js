"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
var config = {
    jwt: {
        secretKey: process.env.JWT_SECRET_KEY,
        expiresIn: '1h',
        issuer: 'imkdw'
    },
    secure: {
        saltCount: 10
    },
    db: {
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        host: process.env.DATABASE_HOST,
        database: process.env.DATABASE_DBNAME
    }
};
exports["default"] = config;
//# sourceMappingURL=config.js.map