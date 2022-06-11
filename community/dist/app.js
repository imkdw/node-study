"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var nunjucks_1 = __importDefault(require("nunjucks"));
var morgan_1 = __importDefault(require("morgan"));
var dotenv_1 = __importDefault(require("dotenv"));
var path_1 = __importDefault(require("path"));
var method_override_1 = __importDefault(require("method-override"));
/** 라우터 모듈 */
var index_1 = __importDefault(require("./routes/index"));
var auth_1 = __importDefault(require("./routes/auth"));
var user_1 = __importDefault(require("./routes/user"));
/** .env 파일 활성화 */
dotenv_1["default"].config();
var app = (0, express_1["default"])();
app.set("port", process.env.PORT || 3000);
/** 미들웨어 정의 */
app.use((0, morgan_1["default"])("dev"));
app.use(express_1["default"].static(path_1["default"].join(__dirname, "../views")));
app.use(express_1["default"].static(path_1["default"].join(__dirname, "../public")));
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: false }));
app.use((0, method_override_1["default"])("_method"));
/** 라우터 정의 */
app.use("/", index_1["default"]);
app.use("/auth", auth_1["default"]);
app.use("/user", user_1["default"]);
/** 템플릿 엔진 설정 */
app.set("view engine", "html");
nunjucks_1["default"].configure({
    express: app,
    watch: true
});
app.listen(app.get("port"), function () {
    console.log("Server Port : ".concat(app.get("port")));
});
//# sourceMappingURL=app.js.map