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
var express_1 = __importDefault(require("express"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var db_1 = __importDefault(require("../db"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
var authRouter = express_1["default"].Router();
var errMsgs = {
    PASSWORD_NOT_MATCH: "비밀번호가 동일하지 않습니다.",
    ACCOUNT_NOT_MATCH: "아이디 또는 비밀번호가 올바르지 않습니다,",
    EXIST_USER: "이미 존재하는 사용자 입니다."
};
/**
 * [POST] /auth/register
 */
authRouter.post("/register", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, password, rePassword, name, email;
    return __generator(this, function (_b) {
        _a = req.body, userId = _a.userId, password = _a.password, rePassword = _a.rePassword, name = _a.name, email = _a.email;
        /** 패스워드 일치여부 검사 로직 */
        if (password !== rePassword) {
            res.status(401).send({
                errCode: "PASSWORD_NOT_MATCH",
                errMsg: "패스워드가 동일하지 않습니다."
            });
            return [2 /*return*/];
        }
        bcrypt_1["default"].genSalt(10, function (err, salt) {
            bcrypt_1["default"].hash(password, salt, function (err, hash) {
                var registerQuery = "INSERT INTO users(userId, password, name, email) value ('".concat(userId, "', '").concat(hash, "', '").concat(name, "', '").concat(email, "')");
                db_1["default"].query(registerQuery, function (err, results) {
                    if (err) {
                        /** 이미 존재하는 사용자 검증 */
                        if (err.code === "ER_DUP_ENTRY") {
                            res.status(401).send({
                                errCode: "EXIST_USER",
                                errMsg: "이미 존재하는 사용자 입니다."
                            });
                            return;
                        }
                    }
                    console.log("[\uD68C\uC6D0\uAC00\uC785] ".concat(userId, "\uB2D8 \uD68C\uC6D0\uAC00\uC785 \uC644\uB8CC"));
                    res.status(200).send();
                });
            });
        });
        return [2 /*return*/];
    });
}); });
/**
 * [GET] /auth/login
 */
authRouter.post("/login", function (req, res, next) {
    var _a = req.body, userId = _a.userId, password = _a.password;
    /** 공백 입력 검증 */
    if (userId.length === 0 || password.length === 0) {
        res.status(401).send({
            errCode: "ACCOUNT_NOT_MATCH",
            errMsg: "아이디 또는 비밀번호가 올바르지 않습니다."
        });
        return;
    }
    var loginQuery = "SELECT * from users where userId=\"".concat(userId, "\"");
    db_1["default"].query(loginQuery, function (err, results) {
        if (err) {
            throw err;
        }
        /** 로그인한 유저가 존재하는지 검증 */
        if (Object.keys(results).length === 0) {
            res.status(401).send({
                errCode: "ACCOUNT_NOT_MATCH",
                errMsg: "아이디 또는 비밀번호가 올바르지 않습니다."
            });
            return;
        }
        var existPassword = results[0].password;
        if (bcrypt_1["default"].compare(password, existPassword)) {
            var jwtSecretKey = process.env.JWT_SECRET_KEY;
            var token = jsonwebtoken_1["default"].sign({
                userId: userId
            }, jwtSecretKey, {
                expiresIn: "5m",
                issuer: "imkdw"
            });
            res.status(200).send({ accessToken: token });
        }
        else {
            res.status(401).send({
                errCode: "ACCOUNT_NOT_MATCH",
                errMsg: "아이디 또는 비밀번호가 올바르지 않습니다."
            });
        }
    });
});
exports["default"] = authRouter;
//# sourceMappingURL=auth.js.map