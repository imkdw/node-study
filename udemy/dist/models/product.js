"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var products = [];
var p = path_1["default"].join(__dirname, '..', '..', 'src', 'data', 'products.json');
/** products.json에서 상품목록을 가져오는 함수 */
var getProductsFromFile = function (callback) {
    fs_1["default"].readFile(p, function (err, fileContent) {
        /** 에러가 발생하거나 기존 데이터가 없는경우 */
        if (err || fileContent.toString() === '') {
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
    }
    ProductModel.prototype.save = function () {
        var _this = this;
        getProductsFromFile(function (products) {
            var productData = {
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
        });
    };
    ProductModel.fetchAll = function (callback) {
        getProductsFromFile(callback);
    };
    return ProductModel;
}());
exports["default"] = ProductModel;
//# sourceMappingURL=product.js.map