"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var mongodb_1 = require("mongodb");
var database_1 = require("../util/database");
var User = /** @class */ (function () {
    function User(username, email, cart, id) {
        this.username = username;
        this.email = email;
        this.cart = cart;
        this.id = id;
    }
    User.prototype.save = function () {
        var db = (0, database_1.getDb)();
        return db
            .collection("users")
            .insertOne(this)
            .then()["catch"](function (err) { return console.error(err); });
    };
    User.prototype.addToCart = function (product) {
        var updatedCart = { items: [__assign(__assign({}, product), { quantity: 1 })] };
        var db = (0, database_1.getDb)();
        return db.collection("users").updateOne({ _id: new mongodb_1.ObjectId() }, { $set: { cart: updatedCart } });
    };
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