"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Jwt = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
var SECRET_KEY = process.env.JWT_SECRET_KEY;
var Jwt = /** @class */ (function () {
    function Jwt() {
    }
    Jwt.create = function (userId) {
        try {
            return jsonwebtoken_1["default"].sign({
                userId: userId
            }, SECRET_KEY, {
                expiresIn: "1h",
                issuer: "imkdw"
            });
        }
        catch (error) {
            console.error(error);
        }
    };
    Jwt.decoded = function (accessToken) {
        try {
            return jsonwebtoken_1["default"].verify(accessToken, SECRET_KEY);
        }
        catch (error) {
            console.error(error);
        }
    };
    return Jwt;
}());
exports.Jwt = Jwt;
//# sourceMappingURL=jwt.js.map