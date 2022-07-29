"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = require("../config/config");
var Jwt = /** @class */ (function () {
    function Jwt() {
    }
    Jwt.createToken = function (userId) {
        var payload = { userId: userId };
        var secretKey = config_1.config.jwt.secretKey;
        var options = {
            expiresIn: config_1.config.jwt.expiresIn,
            issuer: config_1.config.jwt.issuer
        };
        var accessToken = jsonwebtoken_1["default"].sign(payload, secretKey, options);
        return accessToken;
    };
    return Jwt;
}());
exports["default"] = Jwt;
//# sourceMappingURL=jwt.js.map