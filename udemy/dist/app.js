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
var product_1 = require("./models/product");
var app = (0, express_1["default"])();
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
app.use(error_1["default"].get404);
product_1.Product.sync();
database_1.sequelize
    .sync()
    .then(function (result) {
    console.log("[SUCCESS] Sequelize Sync");
    app.listen(3000, function () {
        console.log("Server Listening on 3000");
    });
})["catch"](function (err) { return console.error(err); });
//# sourceMappingURL=app.js.map