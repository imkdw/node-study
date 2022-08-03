"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var morgan_1 = __importDefault(require("morgan"));
var authRouter_1 = __importDefault(require("./routes/authRouter"));
var tweetRouter_1 = __importDefault(require("./routes/tweetRouter"));
var userRouter_1 = __importDefault(require("./routes/userRouter"));
dotenv_1["default"].config();
switch (process.env.NODE_MODE) {
    case 'prod':
        dotenv_1["default"].config({ path: './env/.env.prod' });
        break;
    case 'test':
        dotenv_1["default"].config({ path: './env/env.test' });
        break;
    case 'dev':
        dotenv_1["default"].config({ path: './env/.env.dev' });
        break;
}
exports.app = (0, express_1["default"])();
exports.app.set('port', process.env.PORT || 5000);
/** 미들웨어 정의 */
exports.app.use((0, morgan_1["default"])('dev'));
exports.app.use(express_1["default"].json());
exports.app.use(express_1["default"].urlencoded({ extended: true }));
/** 전역변수 정의 */
exports.app.locals.idCount = 1;
exports.app.locals.users = {};
exports.app.locals.tweets = {};
/** 라우터 정의 */
exports.app.use('/auth', authRouter_1["default"]);
exports.app.use('/tweet', tweetRouter_1["default"]);
exports.app.use('/user', userRouter_1["default"]);
exports.app.get('/test', function (req, res) {
    res.send('success');
});
console.log(process.env.NODE_MODE);
exports.app.listen(exports.app.get('port'), function () {
    console.log("Server Running : PORT : ".concat(exports.app.get('port')));
});
//# sourceMappingURL=app.js.map