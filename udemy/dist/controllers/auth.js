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
var nodemailer_1 = __importDefault(require("nodemailer"));
var sendgridTransport = require("nodemailer-sendgrid-transport");
var transporter = nodemailer_1["default"].createTransport(sendgridTransport({
    auth: {
        api_key: "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"
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
            isAuthenticated: false,
            errorMessage: message
        };
        res.render("auth/login", contexts);
    };
    AuthController.postLogin = function (req, res, next) {
        var _a = req.body, email = _a.email, password = _a.password;
        user_1.userModel.findOne({ email: email }).then(function (user) {
            /** 유저가 없는경우 */
            if (!user) {
                req.flash("error", "Invalid email or password.");
                return res.redirect("/auth/login");
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
                    req.flash("error", "Invalid email or password.");
                    return res.redirect("/auth/login");
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
            errorMessage: message
        };
        res.render("auth/signup", contexts);
    };
    AuthController.postSignup = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, confirmPassword;
            return __generator(this, function (_b) {
                _a = req.body, email = _a.email, password = _a.password, confirmPassword = _a.confirmPassword;
                user_1.userModel
                    .findOne({ email: email })
                    .then(function (result) {
                    if (result) {
                        req.flash("error", "E-mail exist already. Please pick a different one");
                        return res.redirect("/auth/signup");
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
                })["catch"](function (err) { return console.error(err); });
                return [2 /*return*/];
            });
        });
    };
    return AuthController;
}());
exports["default"] = AuthController;
//# sourceMappingURL=auth.js.map