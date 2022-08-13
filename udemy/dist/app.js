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
var app = (0, express_1["default"])();
/** Setting View Engine - PUG */
// app.set("view engine", "pug");
/** Setting View Engine - Handlebars */
// app.engine(
//   "hbs",
//   ExpressHandlebars({
//     layoutsDir: path.join(__dirname, "..", "src", "views", "layouts"),
//     defaultLayout: "main-layout",
//     extname: "hbs",
//   })
// );
// app.set("view engine", "hbs");
/** Setting View Engine - EJS */
app.set("view engine", "ejs");
/** Setting Views Directory - Default is /views */
app.set("views", path_1["default"].join(__dirname, "..", "src", "views"));
/** Setting Middleware */
app.use(body_parser_1["default"].urlencoded({ extended: false }));
app.use(express_1["default"].static(path_1["default"].join(__dirname, "..", "src", "public")));
/** Setting Routers */
app.use(shop_1["default"]);
app.use("/admin", admin_1["default"]);
/** 404(Not Found) Error Handleing */
app.use(function (req, res, next) {
    var contexts = {
        pageTitle: "Page NotFound"
    };
    res.status(404).render("404", contexts);
});
app.listen(3000);
//# sourceMappingURL=app.js.map