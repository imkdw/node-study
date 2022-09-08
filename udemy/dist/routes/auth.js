"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var auth_1 = __importDefault(require("../controllers/auth"));
var authRouter = express_1["default"].Router();
authRouter.get("/login", auth_1["default"].getLogin);
authRouter.post("/login", auth_1["default"].postLogin);
authRouter.get("/signup", auth_1["default"].getSignup);
authRouter.post("/signup", auth_1["default"].postSignup);
authRouter.post("/logout", auth_1["default"].postLogout);
authRouter.get("/reset", auth_1["default"].getReset);
exports["default"] = authRouter;
//# sourceMappingURL=auth.js.map