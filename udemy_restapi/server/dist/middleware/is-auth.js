"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.isAuth = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var isAuth = function (req, res, next) {
    var authHeader = req.get("Authorization");
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
        err.statusCode = 500;
        throw err;
    }
    if (!decodedToken) {
        var error = new Error("Not Authenticated");
        error.statusCode = 401;
        throw error;
    }
    // res.locals.userId = decodedToken.userId;
    req.app.set("userId", decodedToken.userId);
    next();
};
exports.isAuth = isAuth;
