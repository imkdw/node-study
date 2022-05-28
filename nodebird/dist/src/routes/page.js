"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var PageRouter = express_1["default"].Router();
PageRouter.use(function (req, res, next) {
    res.locals.user = null;
    res.locals.followerCount = 0;
    res.locals.followingCount = 0;
    res.locals.followList = [];
    next();
});
PageRouter.get("/profile", function (req, res) {
    res.render("profile.html", { title: "내 정보 - NodeBird" });
});
PageRouter.get("/join", function (req, res) {
    res.render("join", { title: "회원가입 - NodeBird" });
});
PageRouter.get("/", function (req, res, next) {
    var twits = [];
    res.render("main", {
        title: "NodeBird",
        twits: twits
    });
});
exports["default"] = PageRouter;
//# sourceMappingURL=page.js.map