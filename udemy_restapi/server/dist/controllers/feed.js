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
var user_1 = require("./../models/user");
var express_validator_1 = require("express-validator");
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var post_1 = __importDefault(require("../models/post"));
var FeedController = /** @class */ (function () {
    function FeedController() {
    }
    var _a;
    _a = FeedController;
    FeedController.getPosts = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var currentPage, perPage, totalItems, posts, response, err_1;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    currentPage = Number(req.query.page || 1);
                    perPage = 2;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, post_1["default"].find().countDocuments()];
                case 2:
                    totalItems = _b.sent();
                    return [4 /*yield*/, post_1["default"].find()
                            .populate("creator")
                            .skip((currentPage - 1) * perPage)
                            .limit(perPage)];
                case 3:
                    posts = _b.sent();
                    response = {
                        message: "Fetched posts Successfully",
                        posts: posts,
                        totalItems: totalItems
                    };
                    res.status(200).json(response);
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _b.sent();
                    if (!err_1.statusCode) {
                        err_1.statusCode = 500;
                        next(err_1);
                    }
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    FeedController.getPost = function (req, res, next) {
        var postId = req.params.postId;
        post_1["default"].findById(postId)
            .then(function (post) {
            /** Post가 없는 경우 */
            if (!post) {
                var error = new Error("Could not find post");
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({ message: "Post Fetched", post: post });
        })["catch"](function (err) {
            if (!err.statusCdoe) {
                err.statusCode = 500;
            }
            next(err);
        });
    };
    FeedController.createPost = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var _b, title, content, errors, creator, error, error, imageUrl, post, user, userPosts, updatedPosts, err_2;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = req.body, title = _b.title, content = _b.content;
                    errors = (0, express_validator_1.validationResult)(req);
                    /** 유효성 검증시 오류가 있는 경우 */
                    if (!errors.isEmpty()) {
                        error = new Error("Validation Failed, entered data is incorrect");
                        error.statusCode = 422;
                        throw error;
                    }
                    /** 사진 업로드가 안됬거나 사진이 아닌경우 */
                    if (!req.file) {
                        error = new Error("No Image Provibed");
                        error.statusCode = 422;
                    }
                    imageUrl = req.file.path.replace("\\", "/");
                    post = new post_1["default"]({
                        title: title,
                        imageUrl: imageUrl,
                        creator: req.app.get("userId"),
                        content: content
                    });
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, post.save()];
                case 2:
                    _c.sent();
                    return [4 /*yield*/, user_1.UserModel.findById(req.app.get("userId"))];
                case 3:
                    user = _c.sent();
                    userPosts = user.posts;
                    updatedPosts = userPosts.push(post);
                    user.posts = updatedPosts;
                    return [4 /*yield*/, user.save()];
                case 4:
                    _c.sent();
                    res.status(201).json({
                        message: "Post Created Successfully",
                        post: post,
                        creator: { _id: user._id, name: user.name }
                    });
                    return [3 /*break*/, 6];
                case 5:
                    err_2 = _c.sent();
                    if (!err_2.statusCdoe) {
                        err_2.statusCode = 500;
                    }
                    next(err_2);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    FeedController.updatePost = function (req, res, next) {
        var postId = req.params.postId;
        var _b = req.body, title = _b.title, content = _b.content;
        var imageUrl = req.body.imageUrl;
        var errors = (0, express_validator_1.validationResult)(req);
        /** 유효성 검증시 오류가 있는 경우 */
        if (!errors.isEmpty()) {
            var error = new Error("Validation Failed, entered data is incorrect");
            error.statusCode = 422;
            throw error;
        }
        /** 새로 업로드된 파일이 있다면 그걸로 사용 */
        if (req.file) {
            imageUrl = req.file.path;
        }
        /** 사진이 없는 경우는 유효성검증 실패 에러 발생 */
        if (!imageUrl) {
            var error = new Error("No file picked.");
            error.statusCode = 422;
            throw error;
        }
        post_1["default"].findById(postId)
            .then(function (post) {
            if (!post) {
                var error = new Error("Could not find post");
                error.statusCode = 404;
                throw error;
            }
            // 작성자와 업데이트를 요청한 유저가 다를경우
            if (!post.creator.equals(req.app.get("userId"))) {
                var error = new Error("Not authorized");
                error.statusCode = 403;
                throw error;
            }
            /** 업로드 사진이 변경될 경우 기존 사진 삭제 */
            if (imageUrl !== post.imageUrl) {
                clearImage(post.imageUrl);
            }
            post.title = title;
            post.imageUrl = imageUrl.replace("\\", "/");
            post.content = content;
            return post.save();
        })
            .then(function (result) {
            res.status(200).json({ message: "Post Updated!", post: result });
        })["catch"](function (err) {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            throw err;
        });
    };
    FeedController.deletePost = function (req, res, next) {
        var postId = req.params.postId; // 원문으로 넘어옴
        post_1["default"].findById(postId)
            .then(function (post) {
            /** Post를 찾을 수 없을때 */
            if (!post) {
                var error = new Error("Could not find post");
                error.statusCode = 404;
                throw error;
            }
            /** Post 작성자와 현재 로그인한 사용자가 다를때 */
            if (post.creator.toString() !== req.app.get("userId")) {
                var error = new Error("Not authorized");
                error.statusCdoe = 403;
                throw error;
            }
            /** 글 삭제시 이미지도 삭제하는 함수 */
            clearImage(post.imageUrl);
            return post_1["default"].findByIdAndDelete(postId);
        })
            .then(function (result) {
            /** userId로 사용자를 찾아서 반환 */
            return user_1.UserModel.findById(req.app.get("userId"));
        })
            .then(function (user) {
            /** 반환된 사용자의 포스트들 중 삭제를 원하는 포스트만 빼고 제거 */
            var updatedPosts = user.posts.filter(function (post) { return post._id.toString() !== postId; });
            user.posts = updatedPosts;
            return user.save();
        })
            .then(function (result) {
            res.status(200).json({ message: "Deleted Post" });
        })["catch"](function (err) {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            throw err;
        });
    };
    return FeedController;
}());
var clearImage = function (filePath) {
    filePath = path_1["default"].join(__dirname, "..", "..", filePath);
    fs_1["default"].unlink(filePath, function (err) { return console.error(err); });
};
exports["default"] = FeedController;
