"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.isAuth = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var isAuth = function (req, res, next) {
    var authHeader = req.get("Authorization");
    /** 헤더에 인증관련 정보가 없을경우 */
    if (!authHeader) {
        req.app.set("isAuth", false);
        return next();
    }
    if (!authHeader) {
        var error = new Error("Not Authenticated");
        error.statusCode = 401;
        throw error;
    }
    var token = req.get("Authorization").split(" ")[1];
    var decodedToken;
    try {
        decodedToken = jsonwebtoken_1["default"].verify(token, "thisismyjwtsecretkey");
    }
    catch (err) {
        req.app.set("isAuth", false);
        return next();
    }
    if (!decodedToken) {
        req.app.set("isAuth", false);
        return next();
    }
    // res.locals.userId = decodedToken.userId;
    req.app.set("userId", decodedToken.userId);
    req.app.set("isAuth", true);
    next();
};
exports.isAuth = isAuth;
