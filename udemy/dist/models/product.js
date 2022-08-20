"use strict";
exports.__esModule = true;
var database_1 = require("../util/database");
var mongodb_1 = require("mongodb");
var Product = /** @class */ (function () {
    function Product(userDTO) {
        this.title = userDTO.title;
        this.price = userDTO.price;
        this.description = userDTO.description;
        this.imageUrl = userDTO.imageUrl;
        this.id = userDTO.productId;
        this.userId = userDTO.userId;
    }
    Product.prototype.save = function () {
        var db = (0, database_1.getDb)();
        var dbOperation;
        if (this.id) {
            dbOperation = db
                .collection("products")
                .updateOne({ _id: new mongodb_1.ObjectId(this.id) }, { $set: this })
                .then()["catch"](function (err) { return console.error(err); });
        }
        else {
            dbOperation = db
                .collection("products")
                .insertOne(this)
                .then()["catch"](function (err) { return console.error(err); });
        }
        return dbOperation;
    };
    Product.fetchAll = function () {
        var db = (0, database_1.getDb)();
        return db
            .collection("products")
            .find()
            .toArray()
            .then()["catch"](function (err) { return console.error(err); });
    };
    Product.findById = function (productId) {
        var db = (0, database_1.getDb)();
        return db
            .collection("products")
            .findOne({ _id: new mongodb_1.ObjectId(productId) })
            .then()["catch"](function (err) { return console.error(err); });
    };
    Product.deleteById = function (productId) {
        var db = (0, database_1.getDb)();
        return db
            .collection("products")
            .deleteOne({ _id: new mongodb_1.ObjectId(productId) })
            .then()["catch"](function (err) { return console.error(err); });
    };
    return Product;
}());
exports["default"] = Product;
//# sourceMappingURL=product.js.map