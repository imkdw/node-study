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
exports.AuthRouter = void 0;
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var middlewares_1 = require("./middlewares");
var models_1 = require("../../models");
exports.AuthRouter = express_1["default"].Router();
exports.AuthRouter.post("/join", middlewares_1.isNotLoggedIn, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, nick, password, exUser, hash, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, nick = _a.nick, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                return [4 /*yield*/, models_1.User.findOne({ where: { email: email } })];
            case 2:
                exUser = _b.sent();
                if (exUser) {
                    return [2 /*return*/, res.redirect("/join?error=exist")];
                }
                return [4 /*yield*/, bcrypt_1["default"].hash(password, 12)];
            case 3:
                hash = _b.sent();
                return [4 /*yield*/, models_1.User.create({
                        email: email,
                        nick: nick,
                        password: hash
                    })];
            case 4:
                _b.sent();
                return [2 /*return*/, res.redirect("/")];
            case 5:
                error_1 = _b.sent();
                console.error(error_1);
                return [2 /*return*/, next(error_1)];
            case 6: return [2 /*return*/];
        }
    });
}); });
exports.AuthRouter.post("/login", middlewares_1.isNotLoggedIn, function (req, res, next) {
    passport_1["default"].authenticate("local", function (authError, user, info) {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            return res.redirect("?loginError=".concat(info.message));
        }
        return req.logIn(user, function (loginError) {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect("/");
        });
    })(req, res, next);
});
exports.AuthRouter.get("/logout", middlewares_1.isLoggedIn, function (req, res) {
    req.logout();
    req.session.destroy;
    res.redirect("/");
});
//# sourceMappingURL=auth.js.map