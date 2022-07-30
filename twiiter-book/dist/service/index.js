"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.services = void 0;
var tweetService_1 = __importDefault(require("./tweetService"));
var userService_1 = __importDefault(require("./userService"));
var authService_1 = __importDefault(require("./authService"));
exports.services = {
    TweetService: tweetService_1["default"],
    UserService: userService_1["default"],
    AuthService: authService_1["default"]
};
//# sourceMappingURL=index.js.map