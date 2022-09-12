"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.AuthController = void 0;
var user_1 = require("./../models/user");
var express_validator_1 = require("express-validator");
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var AuthController = /** @class */ (function () {
    function AuthController() {
    }
    AuthController.signup = function (req, res, next) {
        var _a = req.body, email = _a.email, name = _a.name, password = _a.password;
        var errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            var error = new Error("Validation failed.");
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
        bcrypt_1["default"]
            .hash(password, 12)
            .then(function (hashedPassword) {
            var user = new user_1.UserModel({ email: email, password: hashedPassword, name: name, status: "Newbie" });
            return user.save();
        })
            .then(function (result) {
            res.status(200).json({ message: "User Created!", userId: result._id });
        })["catch"](function (err) {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            throw err;
        });
    };
    AuthController.login = function (req, res, next) {
        var _a = req.body, email = _a.email, password = _a.password;
        var loadedUser;
        console.log("email: ", email);
        user_1.UserModel.findOne({ email: email })
            .then(function (user) {
            if (!user) {
                var error = new Error("A user with this email cannot found");
                error.statusCode = 404;
                throw error;
            }
            loadedUser = user;
            bcrypt_1["default"]
                .compare(password, user.password)
                .then(function (isEqual) {
                if (!isEqual) {
                    var error = new Error("Wrong Password");
                    error.statusCode = 401;
                    throw error;
                }
                var token = jsonwebtoken_1["default"].sign({
                    email: loadedUser.email,
                    userId: loadedUser._id.toString()
                }, "thisismyjwtsecretkey", { expiresIn: "1h" });
                res.status(200).json({ token: token, userId: loadedUser._id.toString() });
            })["catch"](function (err) {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                throw err;
            });
        })["catch"](function (err) {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            throw err;
        });
    };
    return AuthController;
}());
exports.AuthController = AuthController;
