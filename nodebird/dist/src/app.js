"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var path_1 = __importDefault(require("path"));
var express_session_1 = __importDefault(require("express-session"));
var nunjucks_1 = __importDefault(require("nunjucks"));
var dotenv_1 = __importDefault(require("dotenv"));
var page_1 = __importDefault(require("./routes/page"));
var index_1 = require("../models/index");
dotenv_1["default"].config();
var app = (0, express_1["default"])();
app.set("port", process.env.PORT || 3000);
app.set("view engine", "html");
nunjucks_1["default"].configure("views", {
    express: app,
    watch: true
});
index_1.sequelize
    .sync()
    .then(function () { return console.log("success"); })["catch"](function (error) { return console.error(error); });
app.use((0, morgan_1["default"])("dev"));
app.use(express_1["default"].static(path_1["default"].join(__dirname, "../public")));
app.use(express_1["default"].static(path_1["default"].join(__dirname, "views")));
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: false }));
app.use((0, cookie_parser_1["default"])(process.env.COOKIE_SECRET));
app.use((0, express_session_1["default"])({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false
    }
}));
app.use("/", page_1["default"]);
app.use(function (req, res, next) {
    var error = new Error("".concat(req.method, " ").concat(req.url, " \uB77C\uC6B0\uD130\uAC00 \uC5C6\uC74C."));
    next(error);
});
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
    res.status(err.status || 500);
    res.render("error");
});
app.listen(app.get("port"), function () {
    console.log("".concat(app.get("port"), "\uBC88 \uD3EC\uD2B8\uC5D0\uC11C \uB300\uAE30\uC911"));
});
//# sourceMappingURL=app.js.map