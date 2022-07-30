"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.checkLogin = void 0;
var jwt_1 = __importDefault(require("../module/jwt"));
var checkLogin = function (req, res, next) {
    var accessToken = req.body.accessToken;
    if (jwt_1["default"].verifyToken(accessToken)) {
        console.log("Valid Token");
    }
    else {
        res.send(401).send("인증되지 않은 유저입니다.");
    }
    next();
};
exports.checkLogin = checkLogin;
//# sourceMappingURL=checkLogin.js.map