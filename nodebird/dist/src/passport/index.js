"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.desirializerUser = exports.serializerUser = void 0;
var passport_1 = __importDefault(require("passport"));
var models_1 = require("../../models");
var serializerUser = function () {
    passport_1["default"].serializeUser(function (user, done) {
        /**
         * done 함수
         * @param1 : 에러 발생시 사용하는 인수
         * @param2 : 저장하고 싶은 데이터를 넣는 인수
         */
        done(null, user.id);
    });
};
exports.serializerUser = serializerUser;
var desirializerUser = function () {
    /**
     * passport.deserializeUser 메서드
     * @param1 :
     * @param2 : serializeUser의 done 인자가 해당 메서드의 인자가 됨.
     */
    passport_1["default"].deserializeUser(function (id, done) {
        models_1.User.findOne({ where: { id: id } })
            .then(function (user) { return done(null, user); })["catch"](function (error) { return done(error); });
    });
};
exports.desirializerUser = desirializerUser;
//# sourceMappingURL=index.js.map