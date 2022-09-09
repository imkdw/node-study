"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var auth_1 = __importDefault(require("../controllers/auth"));
var express_validator_1 = require("express-validator");
var user_1 = require("../models/user");
var authRouter = express_1["default"].Router();
authRouter.get("/login", auth_1["default"].getLogin);
authRouter.post("/login", (0, express_validator_1.body)("email").isEmail().withMessage("Please enter a valid email").normalizeEmail(), auth_1["default"].postLogin);
authRouter.get("/signup", auth_1["default"].getSignup);
authRouter.post("/signup", [
    (0, express_validator_1.body)("email")
        .isEmail()
        .withMessage("Please enter a valid Email")
        .custom(function (value) {
        return user_1.userModel.findOne({ email: value }).then(function (userDoc) {
            if (userDoc) {
                return Promise.reject("E-mail Already Use. Please pick different one");
            }
        });
    }),
    (0, express_validator_1.body)("password", "Please enter a Password with only number and text and at least 5 characters")
        .isLength({ min: 5 })
        .isAlphanumeric()
        .trim(),
    (0, express_validator_1.body)("confirmPassword").custom(function (value, _a) {
        var req = _a.req;
        if (value !== req.body.password) {
            throw new Error("Password must be match");
        }
        return true;
    }),
], auth_1["default"].postSignup);
authRouter.post("/logout", auth_1["default"].postLogout);
authRouter.get("/reset", auth_1["default"].getReset);
authRouter.post("/reset", auth_1["default"].postReset);
authRouter.get("/new-password/:token", auth_1["default"].getNewPassword);
authRouter.post("/new-password", auth_1["default"].postNewPassword);
exports["default"] = authRouter;
//# sourceMappingURL=auth.js.map