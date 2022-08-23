"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var stat_1 = __importDefault(require("../controller/stat"));
var StatRouter = express_1["default"].Router();
StatRouter.post("/item-level", stat_1["default"].postItemLevel);
exports["default"] = StatRouter;
//# sourceMappingURL=stat.js.map