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
var user_1 = __importDefault(require("./models/user"));
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
/** etc */
app.use(function (req, res, next) {
    user_1["default"].findByPk(1)
        .then(function (user) {
        req.user = user;
    })["catch"](function (err) { return console.error(err); });
});
/** 404(Not Found) Error Handleing */
app.use(error_1["default"].get404);
product_1.Product.belongsTo(user_1["default"], { constraints: true, onDelete: "CASCADE" });
user_1["default"].hasMany(product_1.Product);
// Product.sync();
// User.sync();
database_1.sequelize
    .sync()
    .then(function (result) {
    return user_1["default"].findByPk(1);
})
    .then(function (user) {
    if (!user) {
        return user_1["default"].create({
            name: "max",
            email: "test@test.com"
        });
    }
    return Promise.resolve(user);
})
    .then(function (user) {
    // console.log(user);
    app.listen(3000);
})["catch"](function (err) { return console.error(err); });
//# sourceMappingURL=app.js.map