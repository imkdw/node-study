"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var user_1 = require("../models/user");
var bcryptjs_1 = require("bcryptjs");
var dotenv_1 = __importDefault(require("dotenv"));
var uuid_1 = require("uuid");
var express_validator_1 = require("express-validator");
dotenv_1["default"].config();
var nodemailer_1 = __importDefault(require("nodemailer"));
var mongodb_1 = require("mongodb");
var sendgridTransport = require("nodemailer-sendgrid-transport");
var transporter = nodemailer_1["default"].createTransport(sendgridTransport({
    auth: {
        api_key: process.env.SENDGRID_API_KEY
    }
}));
var AuthController = /** @class */ (function () {
    function AuthController() {
    }
    AuthController.getLogin = function (req, res, next) {
        var message = req.flash("error");
        if (message.length > 0) {
            message = message[0];
        }
        else {
            message = null;
        }
        var contexts = {
            path: "/auth/login",
            pageTitle: "Login",
            oldInput: { email: "", password: "" },
            errorMessage: message,
            validationErrors: []
        };
        res.render("auth/login", contexts);
    };
    AuthController.postLogin = function (req, res, next) {
        var _a = req.body, email = _a.email, password = _a.password;
        var errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            var contexts = {
                path: "/auth/login",
                pageTitle: "Login",
                isAuthenticated: false,
                errorMessage: errors.array()[0].msg,
                oldInput: { email: email, password: password },
                validationErrors: errors.array()
            };
            return res.status(422).render("auth/login", contexts);
        }
        user_1.userModel.findOne({ email: email }).then(function (user) {
            /** 유저가 없는경우 */
            if (!user) {
                req.flash("error", "Invalid email or password.");
                var contexts = {
                    path: "/auth/login",
                    pageTitle: "Login",
                    isAuthenticated: false,
                    errorMessage: req.flash("error"),
                    oldInput: { email: email, password: password },
                    validationErrors: []
                };
                return res.render("auth/login", contexts);
            }
            (0, bcryptjs_1.compare)(password, user.password)
                .then(function (doMatch) {
                if (doMatch) {
                    req.session.isLoggedIn = true;
                    req.session.user = user;
                    return req.session.save(function (err) {
                        console.error(err);
                        res.redirect("/");
                    });
                }
                else {
                    var contexts = {
                        path: "/auth/login",
                        pageTitle: "Login",
                        isAuthenticated: false,
                        errorMessage: "Invalid email or password",
                        oldInput: { email: email, password: password },
                        validationErrors: []
                    };
                    return res.render("auth/login", contexts);
                }
            })["catch"](function (err) { return console.error(err); });
        });
    };
    AuthController.postLogout = function (req, res, next) {
        req.session.destroy(function (err) {
            console.log(err);
            res.redirect("/");
        });
    };
    AuthController.getSignup = function (req, res, next) {
        var message = req.flash("error");
        if (message.length > 0) {
            message = message[0];
        }
        else {
            message = null;
        }
        var contexts = {
            path: "/auth/signup",
            pageTitle: "Signup",
            isAuthenticated: false,
            errorMessage: message,
            oldInput: {
                email: "",
                password: "",
                confirmPassword: ""
            },
            validationErrors: []
        };
        res.render("auth/signup", contexts);
    };
    AuthController.postSignup = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, confirmPassword, errors, contexts;
            return __generator(this, function (_b) {
                _a = req.body, email = _a.email, password = _a.password, confirmPassword = _a.confirmPassword;
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    console.log(errors);
                    contexts = {
                        path: "/auth/signup",
                        pageTitle: "Signup",
                        isAuthenticated: false,
                        errorMessage: errors.array()[0].msg,
                        oldInput: { email: email, password: password, confirmPassword: confirmPassword },
                        validationErrors: errors.array()
                    };
                    return [2 /*return*/, res.status(422).render("auth/signup", contexts)];
                }
                (0, bcryptjs_1.hash)(password, 12)
                    .then(function (hashedPassword) {
                    var user = new user_1.userModel({ email: email, password: hashedPassword, cart: { items: [] } });
                    user.save();
                    res.redirect("/auth/login");
                    return transporter.sendMail({
                        to: email,
                        from: "imkdw@kakao.com",
                        subject: "Signup Succeeded",
                        html: "<h1>Welcome!</h1>"
                    });
                })["catch"](function (err) { return console.error(err); });
                return [2 /*return*/];
            });
        });
    };
    AuthController.getReset = function (req, res, next) {
        var message = req.flash("error");
        if (message.length > 0) {
            message = message[0];
        }
        else {
            message = null;
        }
        var contexts = {
            path: "/auth/reset",
            pageTitle: "Reset Password",
            errorMessage: message
        };
        res.render("auth/reset", contexts);
    };
    AuthController.postReset = function (req, res, next) {
        var email = req.body.email;
        var token = (0, uuid_1.v4)();
        user_1.userModel
            .findOne({ email: email })
            .then(function (user) {
            if (!user) {
                req.flash("error", "No Account with that email Found");
                res.redirect("/auth/reset");
            }
            user.resetToken = token;
            user.resetTokenExpiration = new Date(Date.now() + 3600000); // 1 hours
            return user.save();
        })
            .then(function (result) {
            res.redirect("/");
            return transporter.sendMail({
                to: email,
                from: "Dongwoo Kim <imkdw@kakao.com>",
                subject: "Password Reset",
                html: "\n          <p>Hello! ".concat(email, "</p>\n          <p>You Request a password Reset</p>\n          <p>Click this <a href=\"http://localhost:3000/auth/new-password/").concat(token, "\">link</a> to set New Password</p>\n        ")
            });
        })["catch"](function (err) { return console.error(err); });
    };
    AuthController.getNewPassword = function (req, res, next) {
        var resetToken = req.params.token;
        user_1.userModel
            .findOne({ resetToken: resetToken, resetTokenExpiration: { $gt: Date.now() } })
            .then(function (user) {
            var message = req.flash("error");
            if (message.length > 0) {
                message = message[0];
            }
            else {
                message = null;
            }
            var contexts = {
                path: "/auth/new-password",
                pageTitle: "Reset Password",
                errorMessage: message,
                userId: user._id,
                newPasswordToken: resetToken
            };
            res.render("auth/new-password", contexts);
        })["catch"](function (err) { return console.error(err); });
    };
    AuthController.postNewPassword = function (req, res, next) {
        var _a = req.body, newPassword = _a.newPassword, userId = _a.userId, newPasswordToken = _a.newPasswordToken;
        var resetUser;
        user_1.userModel
            .findOne({
            resetToken: newPasswordToken,
            resetTokenExpiration: { $gt: Date.now() },
            _id: new mongodb_1.ObjectId(userId)
        })
            .then(function (user) {
            resetUser = user;
            return (0, bcryptjs_1.hash)(newPassword, 12);
        })
            .then(function (hashedPassword) {
            resetUser.password = hashedPassword;
            resetUser.resetToken = undefined;
            resetUser.resetTokenExpiration = undefined;
            return resetUser.save();
        })
            .then(function (result) { return res.redirect("/auth/login"); })["catch"](function (err) { return console.error(err); });
    };
    return AuthController;
}());
exports["default"] = AuthController;
//# sourceMappingURL=auth.js.map