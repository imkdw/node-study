"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var user_1 = require("./../models/user");
var auth_1 = require("./../controllers/auth");
var express_1 = __importDefault(require("express"));
var express_validator_1 = require("express-validator");
var authRouter = express_1["default"].Router();
authRouter.put("/signup", [
    (0, express_validator_1.body)("email")
        .isEmail()
        .withMessage("Please enter a valid email")
        .custom(function (value) {
        return user_1.UserModel.findOne({ email: value }).then(function (user) {
            if (user) {
                return Promise.reject("E-Mail address alreay exists");
            }
        });
    })
        .normalizeEmail(),
    (0, express_validator_1.body)("password").trim().isLength({ min: 5 }),
    (0, express_validator_1.body)("name").trim().not().isEmpty(),
], auth_1.AuthController.signup);
authRouter.post("/login", auth_1.AuthController.login);
exports["default"] = authRouter;
