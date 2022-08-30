"use strict";
exports.__esModule = true;
var mongodb_1 = require("mongodb");
var database_1 = require("../util/database");
var Product = /** @class */ (function () {
    function Product(productData) {
        this.title = productData.title;
        this.price = productData.price;
        this.description = productData.description;
        this.imageUrl = productData.imageUrl;
        this.productId = productData.productId ? productData.productId : null;
        this.userId = productData.userId;
    }
    Product.prototype.save = function () {
        var db = (0, database_1.getDb)();
        var dbOp;
        if (this.productId) {
            dbOp = db.collection("products").updateOne({ _id: new mongodb_1.ObjectId(this.productId) }, { $set: this });
        }
        else {
            dbOp = db.collection("products").insertOne(this);
        }
        return dbOp.then()["catch"](function (err) { return console.error(err); });
    };
    Product.fetchAll = function () {
        var db = (0, database_1.getDb)();
        return db
            .collection("products")
            .find()
            .toArray()
            .then()["catch"](function (err) {
            console.error(err);
        });
    };
    Product.findById = function (productId) {
        var db = (0, database_1.getDb)();
        return db
            .collection("products")
            .find({ _id: new mongodb_1.ObjectId(productId) })
            .toArray()
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