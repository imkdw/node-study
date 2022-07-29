"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.config = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
exports.config = {
    jwt: {
        secretKey: process.env.JWT_SECRET_KEY,
        expiresIn: "1h",
        issuer: "imkdw"
    },
    secure: {
        saltCount: 10
    }
};
//# sourceMappingURL=config.js.map