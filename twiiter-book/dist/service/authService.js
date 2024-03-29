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
var authModel_1 = __importDefault(require("../models/authModel"));
var jwt_1 = __importDefault(require("../module/jwt"));
var secure_1 = __importDefault(require("../module/secure"));
var AuthService = /** @class */ (function () {
    function AuthService() {
    }
    AuthService.signUp = function (newUser) {
        return __awaiter(this, void 0, void 0, function () {
            var _b, userId, userRecord, err_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = newUser;
                        return [4 /*yield*/, secure_1["default"].hash(newUser.password)];
                    case 1:
                        _b.password = _c.sent();
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 6, , 7]);
                        return [4 /*yield*/, authModel_1["default"].signUp(newUser)];
                    case 3:
                        userId = _c.sent();
                        if (!(typeof userId === 'number')) return [3 /*break*/, 5];
                        return [4 /*yield*/, authModel_1["default"].searchUser(userId)];
                    case 4:
                        userRecord = _c.sent();
                        return [2 /*return*/, userRecord];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        err_1 = _c.sent();
                        return [2 /*return*/, err_1];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    var _a;
    _a = AuthService;
    AuthService.searchUser = function (lastRowId) { return __awaiter(void 0, void 0, void 0, function () {
        var searchUserRecord;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, authModel_1["default"].searchUser(lastRowId)];
                case 1:
                    searchUserRecord = _b.sent();
                    return [2 /*return*/, searchUserRecord];
            }
        });
    }); };
    AuthService.signIn = function (email, password) { return __awaiter(void 0, void 0, void 0, function () {
        var hashedPassword, compare, accessToken, err_2;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, authModel_1["default"].getPassword(email)];
                case 1:
                    hashedPassword = _b.sent();
                    if (!(typeof hashedPassword === 'string')) return [3 /*break*/, 3];
                    return [4 /*yield*/, secure_1["default"].comparePassword(password, hashedPassword)];
                case 2:
                    compare = _b.sent();
                    if (!compare) {
                        return [2 /*return*/];
                    }
                    accessToken = jwt_1["default"].createToken(email);
                    return [2 /*return*/, accessToken];
                case 3: return [3 /*break*/, 5];
                case 4:
                    err_2 = _b.sent();
                    return [2 /*return*/, err_2];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    AuthService.getUserId = function (email) { return __awaiter(void 0, void 0, void 0, function () {
        var userIdRecord;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, authModel_1["default"].getUserId(email)];
                case 1:
                    userIdRecord = _b.sent();
                    return [2 /*return*/, userIdRecord];
            }
        });
    }); };
    return AuthService;
}());
exports["default"] = AuthService;
//# sourceMappingURL=authService.js.map