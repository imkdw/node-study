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
        done(null, user.id);
    });
};
exports.serializerUser = serializerUser;
var desirializerUser = function () {
    passport_1["default"].deserializeUser(function (id, done) {
        models_1.User.findOne({ where: { id: id } })
            .then(function (user) { return done(null, user); })["catch"](function (error) { return done(error); });
    });
};
exports.desirializerUser = desirializerUser;
//# sourceMappingURL=index.js.map