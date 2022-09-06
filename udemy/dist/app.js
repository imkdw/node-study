"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var path_1 = __importDefault(require("path"));
var mongoose_1 = __importDefault(require("mongoose"));
var express_session_1 = __importDefault(require("express-session"));
var connect_mongodb_session_1 = __importDefault(require("connect-mongodb-session"));
var morgan_1 = __importDefault(require("morgan"));
var admin_1 = __importDefault(require("./routes/admin"));
var shop_1 = __importDefault(require("./routes/shop"));
var error_1 = __importDefault(require("./controllers/error"));
var user_1 = require("./models/user");
var auth_1 = __importDefault(require("./routes/auth"));
var app = (0, express_1["default"])();
var mongoDbUrl = "mongodb+srv://root:zz11xx22@cluster0.gtcw5zo.mongodb.net/shop?retryWrites=true&w=majority";
/** MongoStore(Save Session) */
var MongoDBStore1 = (0, connect_mongodb_session_1["default"])(express_session_1["default"]);
var store = new MongoDBStore1({
    uri: mongoDbUrl,
    collection: "sessions"
});
/** Setting View Engine - EJS */
app.set("view engine", "ejs");
/** Setting Views Directory - Default is /views */
app.set("views", path_1["default"].join(__dirname, "..", "src", "views"));
/** Setting Middleware */
app.use(body_parser_1["default"].urlencoded({ extended: false }));
app.use(express_1["default"].static(path_1["default"].join(__dirname, "..", "src", "public")));
app.use((0, express_session_1["default"])({ secret: "i am imkdw", resave: false, saveUninitialized: false, store: store }));
app.use((0, morgan_1["default"])("dev"));
/** Temp Find User Middleware */
app.use(function (req, res, next) {
    user_1.userModel
        .findById("63145356efa53b689834564c")
        .then(function (user) {
        res.locals.user = user;
        // console.log(res.locals.user);
        next();
    })["catch"](function (err) { return console.error(err); });
});
/** Setting Routers */
app.use(shop_1["default"]);
app.use("/admin", admin_1["default"]);
app.use("/auth", auth_1["default"]);
/** 404(Not Found) Error Handleing */
app.use(error_1["default"].get404);
/** Load User by Session */
app.use(function (req, res, next) {
    if (!req.session.user) {
        next();
    }
    user_1.userModel
        .findById(req.session.user._id)
        .then(function (user) {
        res.locals.user = user;
        next();
    })["catch"](function (err) { return console.error(err); });
});
/** Connect Mongoose and Open Server */
mongoose_1["default"]
    .connect(mongoDbUrl)
    .then(function (result) {
    app.listen(3000, function () {
        console.log("PORT IS 3000");
    });
})["catch"](function (err) { return console.error(err); });
//# sourceMappingURL=app.js.map