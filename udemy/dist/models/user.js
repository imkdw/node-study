"use strict";
exports.__esModule = true;
var mongodb_1 = require("mongodb");
var database_1 = require("../util/database");
var User = /** @class */ (function () {
    function User(username, email) {
        this.username = username;
        this.email = email;
    }
    User.prototype.save = function () {
        var db = (0, database_1.getDb)();
        return db
            .collection("users")
            .insertOne(this)
            .then()["catch"](function (err) { return console.error(err); });
    };
    User.prototype.addToCart = function () { };
    User.findById = function (userId) {
        var db = (0, database_1.getDb)();
        return db
            .collection("users")
            .find({ _id: new mongodb_1.ObjectId(userId) })
            .toArray()
            .then()["catch"](function (err) { return console.error(err); });
    };
    return User;
}());
exports["default"] = User;
//# sourceMappingURL=user.js.map