"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var mongoose_1 = __importDefault(require("mongoose"));
var multer_1 = __importDefault(require("multer"));
var uuid_1 = require("uuid");
var feed_1 = __importDefault(require("./routes/feed"));
var path_1 = __importDefault(require("path"));
var app = (0, express_1["default"])();
/** multer에서 사용할 스토리지 */
var fileStorage = multer_1["default"].diskStorage({
    destination: function (req, file, cb) {
        cb(null, "images");
    },
    filename: function (req, file, cb) {
        cb(null, "".concat((0, uuid_1.v4)(), "-").concat(file.originalname));
    }
});
/** multer에서 사용할 파일 확장자 필터 */
var fileFilter = function (req, file, cb) {
    var mimetype = file.mimetype;
    if (mimetype === "image/png" || mimetype === "image/jpg" || mimetype === "image/jpeg") {
        cb(null, true);
    }
    cb(null, false);
};
/** 미들웨어 설정 */
app.use(express_1["default"].json());
app.use((0, morgan_1["default"])("dev"));
app.use((0, multer_1["default"])({ storage: fileStorage, fileFilter: fileFilter }).single("image"));
/** Static 폴더 설정 */
app.use("/images", express_1["default"].static(path_1["default"].join(__dirname, "..", "images")));
/** CORS 대비 헤더 설정 미들웨어 */
app.use(function (req, res, next) {
    /** 엑세스를 허용할 모든 url 지정, * 또는 특정 url을 기입 */
    res.setHeader("Access-Control-Allow-Origin", "*");
    /** 외부에서 HTTP 프로토콜로 데이터에 엑세스가 가능하도록 설정 */
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    /** 클라이언트 측에서 요청에 설정할수 있는 헤더 지정
     * Content-Type과 Authorization은 필수로 추가
     */
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
/** 에러 핸들링 미들웨어 */
app.use(function (error, req, res, next) {
    console.error(error);
    var status = error.statusCode || 500;
    var message = error.message;
    res.status(status).json({ message: message });
});
/** 라우터 설정 */
app.use("/feed", feed_1["default"]);
mongoose_1["default"]
    .connect("mongodb://localhost:27017/shop")
    .then(function (result) {
    app.listen(5000, function () {
        console.log("PORT : 5000");
    });
})["catch"](function (err) { return console.error(err); });
