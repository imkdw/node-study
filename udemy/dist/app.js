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
/** Dummy User Data */
app.use(function (req, res, next) {
    user_1["default"].findByPk(1)
        .then(function (user) {
        res.locals.user = user;
        console.log(user[0]);
        next();
    })["catch"](function (err) { return console.error(err); });
});
/** Setting Routers */
app.use(shop_1["default"]);
app.use("/admin", admin_1["default"]);
/** 404(Not Found) Error Handleing */
app.use(error_1["default"].get404);
product_1.Product.belongsTo(user_1["default"], { constraints: true, onDelete: "CASCADE" });
user_1["default"].hasMany(product_1.Product);
product_1.Product.sync();
user_1["default"].sync();
database_1.sequelize
    .sync({ alter: true })
    .then(function (result) {
    /** sync 성공시 id가 1인 유저를 리턴 */
    return user_1["default"].findByPk(1);
})
    .then(function (user) {
    /** 만약 유저정보가 없다면 유저 생성 */
    if (!user) {
        return user_1["default"].create({
            name: "max",
            email: "test@test.com"
        });
    }
    // resolve(user) 반환
    return Promise.resolve(user);
})
    .then(function (user) {
    /** parameter로 return 된 유저를 얻음 */
    app.listen(3000, function () { return console.log("Port : 3000"); });
})["catch"](function (err) { return console.error(err); });
//# sourceMappingURL=app.js.map