"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var database_1 = require("../util/database");
var p = path_1["default"].join(__dirname, "..", "..", "src", "data", "products.json");
/** products.json에서 상품목록을 가져오는 함수 */
var getProductsFromFile = function (callback) {
    fs_1["default"].readFile(p, function (err, fileContent) {
        /** 에러가 발생하거나 기존 데이터가 없는경우 */
        if (err || fileContent.toString() === "") {
            callback([]);
            return;
        }
        callback(JSON.parse(fileContent.toString()));
    });
};
var ProductModel = /** @class */ (function () {
    function ProductModel(product) {
        this.title = product.title;
        this.imageUrl = product.imageUrl;
        this.description = product.description;
        this.price = product.price;
        this.id = product.productId;
    }
    ProductModel.prototype.save = function () {
        var query = "INSERT INTO products(title, price, imageUrl, description) VALUES (?, ?, ?, ?)";
        return database_1.promisePool.execute(query, [
            this.title,
            this.price,
            this.imageUrl,
            this.description,
        ]);
    };
    ProductModel.fetchAll = function (callback) {
        getProductsFromFile(callback);
    };
    ProductModel.databaseFetchAll = function () {
        return database_1.promisePool.execute("SELECT * FROM products");
    };
    ProductModel.findById = function (id, callback) {
        getProductsFromFile(function (products) {
            var product = products.find(function (p) { return p.id === id; });
            callback(product);
        });
    };
    ProductModel.dbFindById = function (id) {
        var query = "SELECT * FROM products WHERE id=?";
        return database_1.promisePool.execute(query, [id]);
    };
    ProductModel.deleteById = function (id, callback) {
        getProductsFromFile(function (products) {
            var updatedProduct = products.filter(function (prod) { return prod.id !== id; });
            fs_1["default"].writeFile(p, JSON.stringify(updatedProduct), function (err) {
                if (err) {
                    console.error(err);
                }
            });
        });
    };
    return ProductModel;
}());
exports["default"] = ProductModel;
//# sourceMappingURL=product.js.map