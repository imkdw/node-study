"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const IndexRouter = express_1.default.Router();
IndexRouter.get("/", (req, res) => {
    res.send("Hello Index");
});
exports.default = IndexRouter;
//# sourceMappingURL=index.js.map