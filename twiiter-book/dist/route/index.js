"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.routers = void 0;
var authRouter_1 = __importDefault(require("./authRouter"));
var tweetRouter_1 = __importDefault(require("./tweetRouter"));
var userRouter_1 = __importDefault(require("./userRouter"));
exports.routers = {
    authRouter: authRouter_1["default"],
    tweetRouter: tweetRouter_1["default"],
    userRouter: userRouter_1["default"]
};
//# sourceMappingURL=index.js.map