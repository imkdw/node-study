"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var mongoose_1 = __importDefault(require("mongoose"));
var express_session_1 = __importDefault(require("express-session"));
var connect_mongodb_session_1 = __importDefault(require("connect-mongodb-session"));
var morgan_1 = __importDefault(require("morgan"));
var csurf_1 = __importDefault(require("csurf"));
var connect_flash_1 = __importDefault(require("connect-flash"));
var multer_1 = __importDefault(require("multer"));
var uuid_1 = require("uuid");
var dotenv_1 = __importDefault(require("dotenv"));
var helmet_1 = __importDefault(require("helmet"));
var compression_1 = __importDefault(require("compression"));
var fs_1 = __importDefault(require("fs"));
var admin_1 = __importDefault(require("./routes/admin"));
var shop_1 = __importDefault(require("./routes/shop"));
var error_1 = __importDefault(require("./controllers/error"));
var user_1 = require("./models/user");
var auth_1 = __importDefault(require("./routes/auth"));
var accessLogStream = fs_1["default"].createWriteStream(path_1["default"].join(__dirname, "..", "access.log"), {
    flags: "a"
});
dotenv_1["default"].config();
var app = (0, express_1["default"])();
app.set("port", process.env.PORT);
var mongoDbUrl = "mongodb://localhost:27017/shop";
/** 세션 저장을 위한 몽고스토어 생성 */
var MongoDBStore1 = (0, connect_mongodb_session_1["default"])(express_session_1["default"]);
var store = new MongoDBStore1({
    uri: mongoDbUrl,
    collection: "sessions"
});
/** CSRF 설정 */
var csrfProtection = (0, csurf_1["default"])();
/** multer 파일저장소 생성 */
var fileStorage = multer_1["default"].diskStorage({
    destination: function (req, file, cb) {
        cb(null, "images");
    },
    filename: function (req, file, cb) {
        cb(null, (0, uuid_1.v4)() + "-" + file.originalname);
    }
});
/** multer 파일필터 생성 */
var fileFilter = function (req, file, cb) {
    var mimetype = file.mimetype;
    if (mimetype === "image/png" || mimetype === "image/jpg" || mimetype === "image/jpeg") {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
/** 뷰 엔진 세팅 - EJS */
app.set("view engine", "ejs");
/** Static 폴더 설정 */
app.set("views", path_1["default"].join(__dirname, "..", "src", "views"));
app.use("/images", express_1["default"].static(path_1["default"].join(__dirname, "..", "images")));
app.use(express_1["default"].static(path_1["default"].join(__dirname, "..", "src", "public")));
/** 미들웨어 설정 */
app.use(express_1["default"].urlencoded({ extended: false }));
app.use((0, express_session_1["default"])({ secret: "i am imkdw", resave: false, saveUninitialized: false, store: store }));
app.use((0, morgan_1["default"])("dev", { stream: accessLogStream }));
app.use(csrfProtection);
app.use((0, connect_flash_1["default"])());
app.use((0, multer_1["default"])({ storage: fileStorage, fileFilter: fileFilter }).single("image"));
app.use((0, helmet_1["default"])());
app.use((0, compression_1["default"])());
/** 사용자 검증 미들웨어 */
app.use(function (req, res, next) {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});
/** 사용자 전역관리 */
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
/** 라우터 설정 */
app.use(shop_1["default"]);
app.use("/admin", admin_1["default"]);
app.use("/auth", auth_1["default"]);
app.get("/500", error_1["default"].get500);
/** 404 에러 핸들러 */
app.use(error_1["default"].get404);
/** 500 에러 핸들러 */
app.use(function (error, req, res, next) {
    console.error(error);
    res.redirect("/500");
});
/** MongoDB 연결 및 서버오픈 */
mongoose_1["default"]
    .connect(mongoDbUrl)
    .then(function (result) {
    app.listen(app.get("port"), function () {
        console.log("PORT IS ", app.get("port"));
    });
})["catch"](function (err) { return console.error(err); });
//# sourceMappingURL=app.js.map