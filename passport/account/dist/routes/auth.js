"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var db_1 = require("../db");
var authRouter = express_1["default"].Router();
authRouter.post("/signup", function (req, res, next) {
    var _a = req.body, username = _a.username, password = _a.password;
    var signUpQuery = "insert into users(username, password) values (\"".concat(username, "\", \"").concat(password, "\")");
    console.log(signUpQuery);
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
exports["default"] = authRouter;
//# sourceMappingURL=auth.js.map