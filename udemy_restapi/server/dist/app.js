"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.app = void 0;
var feed_1 = require("./controllers/feed");
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var mongoose_1 = __importDefault(require("mongoose"));
var multer_1 = __importDefault(require("multer"));
var path_1 = __importDefault(require("path"));
var uuid_1 = require("uuid");
var express_graphql_1 = require("express-graphql");
var cors_1 = __importDefault(require("cors"));
var is_auth_1 = require("./middleware/is-auth");
var feed_2 = __importDefault(require("./routes/feed"));
var auth_1 = __importDefault(require("./routes/auth"));
var schema_1 = require("./graphql/schema");
var resolvers_1 = require("./graphql/resolvers");
exports.app = (0, express_1["default"])();
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
exports.app.use(express_1["default"].json());
exports.app.use(express_1["default"].urlencoded({ extended: true }));
exports.app.use((0, morgan_1["default"])("dev"));
exports.app.use((0, multer_1["default"])({ storage: fileStorage, fileFilter: fileFilter }).single("image"));
exports.app.use((0, cors_1["default"])());
/** Static 폴더 설정 */
exports.app.use("/images", express_1["default"].static(path_1["default"].join(__dirname, "..", "images")));
/** CORS 대비 헤더 설정 미들웨어 */
exports.app.use(function (req, res, next) {
    /** 엑세스를 허용할 모든 url 지정, * 또는 특정 url을 기입 */
    res.setHeader("Access-Control-Allow-Origin", "*");
    /** 외부에서 HTTP 프로토콜로 데이터에 엑세스가 가능하도록 설정 */
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
    /** 클라이언트 측에서 요청에 설정할수 있는 헤더 지정
     * Content-Type과 Authorization은 필수로 추가
     */
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
exports.app.put("post-image", function (req, res, next) {
    if (!is_auth_1.isAuth) {
        throw new Error("Not authenticate");
    }
    /** 파일이 존재하지 않을경우 메세지 리턴 */
    if (!req.file) {
        return res.status(200).send({ message: "no file provided" });
    }
    /** 기존 업로드된 이미지 삭제 */
    if (req.body.oldPath) {
        (0, feed_1.clearImage)(req.body.oldPath);
    }
    return res.status(201).json({ message: "File Stored", filePath: req.file.path });
});
exports.app.use(is_auth_1.isAuth);
exports.app.use("/graphql", (0, express_graphql_1.graphqlHTTP)({
    schema: schema_1.graphqlSchema,
    rootValue: resolvers_1.GraphqlResolver,
    graphiql: true,
    customFormatErrorFn: function (err) {
        /**
         * err.originalError
         * 1. express-graphql이 사용자나 제3자의 오류를 감지했을때 설정
         * 2. 글자누락 등 기술적인 오류가 생긴 경우는 오류가 생성되지 않음
         */
        if (!err.originalError) {
            /** 기술적인 오류가 생긴 경우 graphql로 생성된 오류 반환 */
            return err;
        }
        var data = err.originalError.data;
        var message = err.message || "An error Occurred.";
        var code = err.originalError.code || 500;
        return { data: data, message: message, code: code };
    }
}));
/** 에러 핸들링 미들웨어 */
exports.app.use(function (error, req, res, next) {
    console.error(error);
    var status = error.statusCode || 500;
    var message = error.message;
    var data = error.data;
    res.status(status).json({ message: message, data: data });
});
/** 라우터 설정 */
exports.app.use("/feed", feed_2["default"]);
exports.app.use("/auth", auth_1["default"]);
mongoose_1["default"]
    .connect("mongodb://localhost:27017/shop")
    .then(function (result) {
    exports.app.listen(5000, function () {
        console.log("Server Running on 5000");
    });
})["catch"](function (err) { return console.error(err); });
