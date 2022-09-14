"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.GraphqlResolver = void 0;
var bcrypt_1 = require("bcrypt");
var validator_1 = __importDefault(require("validator"));
var jsonwebtoken_1 = require("jsonwebtoken");
var user_1 = require("../models/user");
var post_1 = __importDefault(require("../models/post"));
var GraphqlResolver = /** @class */ (function () {
    function GraphqlResolver() {
    }
    var _a;
    _a = GraphqlResolver;
    GraphqlResolver.createUser = function (_b) {
        var userInput = _b.userInput;
        return __awaiter(void 0, void 0, void 0, function () {
            var email, password, name, errors, error, existingUser, error, hashedPassword, user, createdUser;
            return __generator(_a, function (_c) {
                switch (_c.label) {
                    case 0:
                        email = userInput.email, password = userInput.password, name = userInput.name;
                        console.log(email, password, name);
                        errors = [];
                        /** 이메일 형식에 맞지 않는경우 */
                        if (!validator_1["default"].isEmail(email)) {
                            errors.push({ message: "E-Mail is invalid" });
                        }
                        /** 공백이거나 길이가 5글자 미만인 경우 */
                        if (validator_1["default"].isEmpty(password) || !validator_1["default"].isLength(password, { min: 5 })) {
                            errors.push({ message: "Password to short" });
                        }
                        /** errors 배열에 값이 하나라도 있으면 유효성검증 실패 */
                        if (errors.length > 0) {
                            error = new Error();
                            error.data = errors;
                            error.code = 422;
                            throw error;
                        }
                        return [4 /*yield*/, user_1.UserModel.findOne({ email: email })];
                    case 1:
                        existingUser = _c.sent();
                        if (existingUser) {
                            error = new Error("User exists already");
                            throw error;
                        }
                        return [4 /*yield*/, (0, bcrypt_1.hash)(password, 12)];
                    case 2:
                        hashedPassword = _c.sent();
                        user = new user_1.UserModel({
                            email: email,
                            password: hashedPassword,
                            name: name,
                            status: "Good"
                        });
                        return [4 /*yield*/, user.save()];
                    case 3:
                        createdUser = _c.sent();
                        return [2 /*return*/, __assign(__assign({}, createdUser._doc), { _id: createdUser._id.toString() })];
                }
            });
        });
    };
    GraphqlResolver.login = function (_b) {
        var email = _b.email, password = _b.password;
        return __awaiter(void 0, void 0, void 0, function () {
            var user, error, isEqual, error, token;
            return __generator(_a, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, user_1.UserModel.findOne({ email: email })];
                    case 1:
                        user = _c.sent();
                        if (!user) {
                            error = new Error("User not found");
                            error.code = 404;
                            throw error;
                        }
                        return [4 /*yield*/, (0, bcrypt_1.compare)(password, user.password)];
                    case 2:
                        isEqual = _c.sent();
                        if (!isEqual) {
                            error = new Error("Password is Incorrect");
                            error.code = 401;
                            throw error;
                        }
                        token = (0, jsonwebtoken_1.sign)({
                            userId: user._id.toString(),
                            email: user.email
                        }, "thisismyjwtsecretkey", { expiresIn: "1h" });
                        return [2 /*return*/, { token: token, userId: user._id.toString() }];
                }
            });
        });
    };
    GraphqlResolver.createPost = function (_b, req) {
        var postInput = _b.postInput;
        return __awaiter(void 0, void 0, void 0, function () {
            var error, errors, error, user, error, post, createdPost, err_1;
            return __generator(_a, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!req.app.get("isAuth")) {
                            error = new Error();
                            error.code = 401;
                            throw 401;
                        }
                        errors = [];
                        if (validator_1["default"].isEmpty(postInput.title) || !validator_1["default"].isLength(postInput.title, { min: 5 })) {
                            errors.push({ messagE: "postInput.Title is invalid" });
                        }
                        if (validator_1["default"].isEmpty(postInput.content) || !validator_1["default"].isLength(postInput.content, { min: 5 })) {
                            errors.push({ messagE: "Content is invalid" });
                        }
                        if (errors.length > 0) {
                            error = new Error();
                            error.data = errors;
                            error.code = 422;
                            throw error;
                        }
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, user_1.UserModel.findById(req.app.get("userId"))];
                    case 2:
                        user = _c.sent();
                        if (!user) {
                            error = new Error();
                            error.code = 401;
                            throw error;
                        }
                        post = new post_1["default"]({
                            title: postInput.title,
                            content: postInput.content,
                            imageUrl: postInput.imageUrl,
                            creator: user
                        });
                        return [4 /*yield*/, post.save()];
                    case 3:
                        createdPost = _c.sent();
                        user.posts.push(createdPost);
                        return [4 /*yield*/, user.save()];
                    case 4:
                        _c.sent();
                        /** 유저 데이터에 포스터 추가 */
                        return [2 /*return*/, __assign(__assign({}, createdPost._doc), { _id: createdPost._id, createdAt: createdPost.createdAt.toISOString(), updatedAt: createdPost.updatedAt.toISOString() })];
                    case 5:
                        err_1 = _c.sent();
                        console.error(err_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    GraphqlResolver.posts = function (_b, req) {
        var page = _b.page;
        return __awaiter(void 0, void 0, void 0, function () {
            var error, perPage, totalPosts, posts, resPosts;
            return __generator(_a, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!req.app.get("isAuth")) {
                            error = new Error();
                            error.code = 401;
                            throw 401;
                        }
                        if (!page) {
                            page = 1;
                        }
                        perPage = 2;
                        totalPosts = post_1["default"].find().countDocuments();
                        return [4 /*yield*/, post_1["default"].find()
                                .sort({ createdAt: -1 })
                                .skip((page - 1) * perPage)
                                .limit(perPage)
                                .populate("creator")];
                    case 1:
                        posts = _c.sent();
                        resPosts = posts.map(function (post) {
                            return __assign(__assign({}, post._doc), { _id: post._id.toString(), createdAt: post.createdAt.toISOString(), updatedAt: post.updatedAt.toISOString() });
                        });
                        return [2 /*return*/, {
                                posts: resPosts,
                                totalPosts: totalPosts
                            }];
                }
            });
        });
    };
    GraphqlResolver.post = function (_b, req) {
        var id = _b.id;
        return __awaiter(void 0, void 0, void 0, function () {
            var post, error;
            return __generator(_a, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, post_1["default"].findById(id).populate("creator")];
                    case 1:
                        post = _c.sent();
                        console.log(post);
                        if (!post) {
                            error = new Error("No Post Found");
                            error.code = 404;
                            throw error;
                        }
                        return [2 /*return*/, __assign(__assign({}, post._doc), { _id: post._id.toString(), createdAt: post.createdAt.toISOString(), updatedAt: post.updatedAt.toISOString() })];
                }
            });
        });
    };
    return GraphqlResolver;
}());
exports.GraphqlResolver = GraphqlResolver;
