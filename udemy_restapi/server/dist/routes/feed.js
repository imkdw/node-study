"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var feed_1 = __importDefault(require("../controllers/feed"));
var express_validator_1 = require("express-validator");
var feedRouter = express_1["default"].Router();
feedRouter.get("/posts", feed_1["default"].getPosts);
feedRouter.post("/post", [(0, express_validator_1.body)("title").trim().isLength({ min: 5 }), (0, express_validator_1.body)("content").trim().isLength({ min: 5 })], feed_1["default"].createPost);
feedRouter.get("/post/:postId", feed_1["default"].getPost);
feedRouter.put("/post/:postId", feed_1["default"].editPost);
exports["default"] = feedRouter;
