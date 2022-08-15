"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
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
        var _this = this;
        getProductsFromFile(function (products) {
            if (_this.id) {
                /** 기존 상품 업데이트 */
                var existProductIndex = products.findIndex(function (prod) { return prod.id === _this.id; });
                var updateProduct = __spreadArray([], products, true);
                updateProduct[existProductIndex] = _this;
                fs_1["default"].writeFile(p, JSON.stringify(updateProduct), {}, function (err) {
                    if (err) {
                        console.error(err);
                    }
                });
            }
            else {
                /** 신규 상품 추가 */
                var productData = {
                    id: Math.random().toString(),
                    title: _this.title,
                    imageUrl: _this.imageUrl,
                    price: _this.price,
                    description: _this.description
                };
                products.push(productData);
                fs_1["default"].writeFile(p, JSON.stringify(products), {}, function (err) {
                    if (err) {
                        console.error(err);
                    }
                });
            }
        });
    };
    ProductModel.fetchAll = function (callback) {
        getProductsFromFile(callback);
    };
    ProductModel.findById = function (id, callback) {
        getProductsFromFile(function (products) {
            var product = products.find(function (p) { return p.id === id; });
            callback(product);
        });
    };
    ProductModel.deleteById = function (id, callback) {
        getProductsFromFile(function (products) {
            var updatedProduct = products.filter(function (prod) { return prod.id !== id; });
            fs_1["default"].writeFile(p, JSON.stringify(updatedProduct), function (err) {
                if (err) {
                    console.error(err);
                }
                callback();
            });
        });
    };
    return ProductModel;
}());
exports["default"] = ProductModel;
//# sourceMappingURL=product.js.map