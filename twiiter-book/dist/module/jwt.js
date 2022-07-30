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
    Jwt.createToken = function (email) {
        var payload = { email: email };
        var secretKey = config_1.config.jwt.secretKey;
        var options = {
            expiresIn: config_1.config.jwt.expiresIn,
            issuer: config_1.config.jwt.issuer
        };
        var accessToken = jsonwebtoken_1["default"].sign(payload, secretKey, options);
        return accessToken;
    };
    Jwt.verifyToken = function (accessToken) {
        if (jsonwebtoken_1["default"].verify(accessToken, config_1.config.jwt.secretKey)) {
            return true;
        }
        return;
    };
    Jwt.decodeToken = function (accessToken) {
        return jsonwebtoken_1["default"].decode(accessToken);
    };
    return Jwt;
}());
exports["default"] = Jwt;
//# sourceMappingURL=jwt.js.map