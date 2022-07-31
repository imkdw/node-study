"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var morgan_1 = __importDefault(require("morgan"));
var authRouter_1 = __importDefault(require("./routes/authRouter"));
var tweetRouter_1 = __importDefault(require("./routes/tweetRouter"));
var userRouter_1 = __importDefault(require("./routes/userRouter"));
dotenv_1["default"].config();
var app = (0, express_1["default"])();
app.set('port', process.env.PORT || 5000);
/** 미들웨어 정의 */
app.use((0, morgan_1["default"])('dev'));
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: true }));
/** 전역변수 정의 */
app.locals.idCount = 1;
app.locals.users = {};
app.locals.tweets = {};
/** 라우터 정의 */
app.use('/auth', authRouter_1["default"]);
app.use('/tweet', tweetRouter_1["default"]);
app.use('/user', userRouter_1["default"]);
app.listen(app.get('port'), function () {
    console.log("Server Running : PORT : ".concat(app.get('port')));
});
//# sourceMappingURL=app.js.map