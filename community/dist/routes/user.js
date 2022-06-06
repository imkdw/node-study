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
var dotenv_1 = __importDefault(require("dotenv"));
var db_1 = __importDefault(require("../db"));
var jwt_1 = require("../modules/jwt");
dotenv_1["default"].config();
var userRouter = express_1["default"].Router();
/**
 * [POST] /user/info
 */
userRouter.post("/info", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var accessToken, decoded, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                accessToken = req.body.accessToken;
                /** 로그인 여부 검증 */
                if (accessToken === "") {
                    res.status(401).send({
                        errMsg: "로그인이 필요한 기능입니다."
                    });
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, jwt_1.decodedToken)(accessToken)];
            case 2:
                decoded = _a.sent();
                db_1["default"].query("SELECT * from users where userId=\"".concat(decoded.userId, "\""), function (err, results) {
                    if (err) {
                        throw err;
                    }
                    var _a = results[0], userId = _a.userId, name = _a.name, email = _a.email;
                    res.status(200).send({
                        userId: userId,
                        name: name,
                        email: email
                    });
                });
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                if (err_1.message === "jwt expired") {
                    res.status(401).send({
                        errMsg: "Expired Token"
                    });
                }
                else {
                    res.status(401).send({
                        errMsg: "Invalid Token"
                    });
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
userRouter.put("/info", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, _a, name, email, updateQuery;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, (0, jwt_1.decodedToken)(JSON.parse(req.body.accessToken).accessToken)];
            case 1:
                userId = (_b.sent()).userId;
                _a = req.body, name = _a.name, email = _a.email;
                updateQuery = "UPDATE users SET name=\"".concat(name, "\", email=\"").concat(email, "\" where userId=\"").concat(userId, "\"");
                db_1["default"].query(updateQuery, function (err, results) {
                    if (err) {
                        throw err;
                    }
                    res.status(200).send();
                });
                return [2 /*return*/];
        }
    });
}); });
userRouter["delete"]("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, deleteQuery;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, jwt_1.decodedToken)(JSON.parse(req.body.accessToken).accessToken)];
            case 1:
                userId = (_a.sent()).userId;
                deleteQuery = "DELETE FROM users where userId=\"".concat(userId, "\"");
                db_1["default"].query(deleteQuery, function (err) {
                    if (err) {
                        throw err;
                    }
                    res.status(200).send();
                });
                return [2 /*return*/];
        }
    });
}); });
exports["default"] = userRouter;
//# sourceMappingURL=user.js.map