"use strict";
exports.__esModule = true;
var database_1 = require("../util/database");
var mongodb_1 = require("mongodb");
var User = /** @class */ (function () {
    function User(userName, email) {
        this.userName = userName;
        this.email = email;
    }
    User.prototype.save = function () {
        var db = (0, database_1.getDb)();
        return db.collection("users").insertOne(this);
    };
    User.findById = function (userId) {
        var db = (0, database_1.getDb)();
        return db
            .collection("users")
            .findOne({ _id: new mongodb_1.ObjectId(userId) })
            .then()["catch"](function (err) { return console.error(err); });
    };
    return User;
}());
exports["default"] = User;
//# sourceMappingURL=user.js.map