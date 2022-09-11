"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_validator_1 = require("express-validator");
var post_1 = __importDefault(require("../models/post"));
var FeedController = /** @class */ (function () {
    function FeedController() {
    }
    FeedController.getPosts = function (req, res, next) {
        post_1["default"].find()
            .then(function (posts) {
            if (!posts) {
                var error = new Error("Cloud not find Posts");
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({ message: "Fetched Posts Successfully", posts: posts });
        })["catch"](function (err) {
            if (!err.statusCdoe) {
                err.statusCode = 500;
            }
            next(err);
        });
    };
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
    FeedController.createPost = function (req, res, next) {
        var _a = req.body, title = _a.title, content = _a.content;
        var errors = (0, express_validator_1.validationResult)(req);
        /** 유효성 검증시 오류가 있는 경우 */
        if (!errors.isEmpty()) {
            var error = new Error("Validation Failed, entered data is incorrect");
            error.statusCode = 422;
            throw error;
        }
        /** 사진 업로드가 안됬거나 사진이 아닌경우 */
        if (!req.file) {
            var error = new Error("No Image Provibed");
            error.statusCode = 422;
        }
        var imageUrl = req.file.path.replace("\\", "/");
        var post = new post_1["default"]({
            title: title,
            imageUrl: imageUrl,
            creator: { name: "Dongwoo" },
            content: content
        });
        post
            .save()
            .then(function (result) {
            console.log(result);
            return res.status(201).json({
                message: "Post created Successfully",
                post: result
            });
        })["catch"](function (err) {
            if (!err.statusCdoe) {
                err.statusCode = 500;
            }
            next(err);
        });
    };
    FeedController.editPost = function (req, res, next) {
        var postId = req.params.postId;
    };
    return FeedController;
}());
exports["default"] = FeedController;
