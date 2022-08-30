"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var path_1 = __importDefault(require("path"));
var admin_1 = __importDefault(require("./routes/admin"));
var shop_1 = __importDefault(require("./routes/shop"));
var error_1 = __importDefault(require("./controllers/error"));
var database_1 = require("./util/database");
var user_1 = __importDefault(require("./models/user"));
var app = (0, express_1["default"])();
/** Setting View Engine - EJS */
app.set("view engine", "ejs");
/** Setting Views Directory - Default is /views */
app.set("views", path_1["default"].join(__dirname, "..", "src", "views"));
/** Setting Middleware */
app.use(body_parser_1["default"].urlencoded({ extended: false }));
app.use(express_1["default"].static(path_1["default"].join(__dirname, "..", "src", "public")));
app.use(function (req, res, next) {
    user_1["default"].findById("6300829655dd72c4720ad37e")
        .then(function (result) {
        res.locals.user = result;
        next();
    })["catch"](function (err) { return console.error(err); });
});
/** Setting Routers */
app.use(shop_1["default"]);
app.use("/admin", admin_1["default"]);
/** 404(Not Found) Error Handleing */
app.use(error_1["default"].get404);
(0, database_1.mongoConnect)(function (client) {
    app.listen(3000, function () { return console.log("Port : 3000"); });
});
//# sourceMappingURL=app.js.map