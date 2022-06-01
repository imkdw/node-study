"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var indexRouter = express_1["default"].Router();
indexRouter.get("/", function (req, res) {
    res.render("index");
});
exports["default"] = indexRouter;
//# sourceMappingURL=index.js.map