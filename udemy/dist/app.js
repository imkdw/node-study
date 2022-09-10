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
var csurf_1 = __importDefault(require("csurf"));
var connect_flash_1 = __importDefault(require("connect-flash"));
var multer_1 = __importDefault(require("multer"));
var uuid_1 = require("uuid");
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
var csrfProtection = (0, csurf_1["default"])();
var fileStorage = multer_1["default"].diskStorage({
    destination: function (req, file, cb) {
        cb(null, "images");
    },
    filename: function (req, file, cb) {
        cb(null, (0, uuid_1.v4)() + "-" + file.originalname);
    }
});
var fileFilter = function (req, file, cb) {
    var mimetype = file.mimetype;
    if (mimetype === "image/png" || mimetype === "image/jpg" || mimetype === "image/jpeg") {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
/** Setting View Engine - EJS */
app.set("view engine", "ejs");
/** Setting Static Directory */
app.set("views", path_1["default"].join(__dirname, "..", "src", "views"));
// app.use(express.static(path.join(__dirname, "..", "src", "views")))
app.use("/images", express_1["default"].static(path_1["default"].join(__dirname, "..", "images")));
/** Setting Middleware */
app.use(body_parser_1["default"].urlencoded({ extended: false }));
app.use(express_1["default"].static(path_1["default"].join(__dirname, "..", "src", "public")));
app.use((0, express_session_1["default"])({ secret: "i am imkdw", resave: false, saveUninitialized: false, store: store }));
app.use((0, morgan_1["default"])("dev"));
app.use(csrfProtection);
app.use((0, connect_flash_1["default"])());
app.use((0, multer_1["default"])({ storage: fileStorage, fileFilter: fileFilter }).single("image"));
/** Authenticate Middleware */
app.use(function (req, res, next) {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});
/** Load User by Session */
app.use(function (req, res, next) {
    if (!req.session.user) {
        return next();
    }
    user_1.userModel
        .findById(req.session.user._id)
        .then(function (user) {
        if (!user) {
            return next();
        }
        res.locals.user = user;
        next();
    })["catch"](function (err) {
        next(new Error(err));
    });
});
/** Setting Routers */
app.use(shop_1["default"]);
app.use("/admin", admin_1["default"]);
app.use("/auth", auth_1["default"]);
app.get("/500", error_1["default"].get500);
/**  Error Handleing */
app.use(error_1["default"].get404);
/** Error Handling Middleware */
app.use(function (error, req, res, next) {
    console.error(error);
    res.redirect("/500");
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