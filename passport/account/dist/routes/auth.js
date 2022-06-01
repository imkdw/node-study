"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var crypto_1 = __importDefault(require("crypto"));
var db_1 = require("../db");
var authRouter = express_1["default"].Router();
authRouter.post("/signup", function (req, res, next) {
    var _a = req.body, username = _a.username, password = _a.password;
    var salt = crypto_1["default"].randomBytes(16);
    crypto_1["default"].pbkdf2(password, salt, 310000, 32, "sha256", function (err, hashedPassword) {
        if (err) {
            next(err);
        }
        var signUpQuery = "insert into users(username, password) values (\"".concat(username, "\", \"").concat(hashedPassword, "\")");
        db_1.db.query(signUpQuery, function (err) {
            if (err) {
                console.error(err);
            }
            else {
                console.log("[Success] ".concat(req.body.username, " REGISTERED"));
                res.redirect("/");
            }
        });
    });
});
authRouter.post("/login", function (req, res, next) {
    con;
});
exports["default"] = authRouter;
//# sourceMappingURL=auth.js.map