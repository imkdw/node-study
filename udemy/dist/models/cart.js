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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var p = path_1["default"].join(__dirname, "..", "..", "src", "data", "cart.json");
var CartModel = /** @class */ (function () {
    function CartModel() {
    }
    CartModel.addProduct = function (productId, productPrice) {
        /** 기존 장바구니 목록 가져오기 */
        fs_1["default"].readFile(p, function (err, fileContent) {
            if (err) {
                console.error(err);
                return;
            }
            var cart = { products: [], totalPrice: 0 };
            /** 기존 상품이 존재하면 */
            if (fileContent.toString() !== "") {
                cart = JSON.parse(fileContent.toString());
            }
            /** findIndex : 있으면 인덱스, 없으면 -1 반환 */
            var existProductIndex = cart.products.findIndex(function (p) { return p.id === productId; });
            /** 기존 상품이 있는 경우 qty 값만 증가 */
            if (existProductIndex !== -1) {
                var existProduct = cart.products[existProductIndex];
                var updateProduct = __assign({}, existProduct);
                updateProduct.qty += 1;
                cart.products[existProductIndex] = __assign({}, updateProduct);
            }
            else {
                /** 기존 상품이 없는경우 새로추가 */
                cart.products.push({
                    id: productId,
                    qty: 1
                });
            }
            cart.totalPrice += Number(productPrice);
            fs_1["default"].writeFile(p, JSON.stringify(cart), function (err) {
                if (err) {
                    console.error(err);
                    return;
                }
            });
        });
    };
    CartModel.getCart = function (callback) {
        /** cart.json을 읽고 모든 카트 목록 반환 */
        fs_1["default"].readFile(p, function (err, fileContent) {
            if (fileContent.toString() !== "") {
                var cart = JSON.parse(fileContent.toString());
                if (err) {
                    callback(null);
                    return;
                }
                else {
                    callback(cart);
                }
            }
            else {
                callback([]);
            }
        });
    };
    CartModel.deleteProduct = function (id, productPrice) {
        console.log(id, productPrice);
        fs_1["default"].readFile(p, function (err, fileContent) {
            /** 데이터가 있을경우 */
            if (fileContent.toString() !== "") {
                var cart = JSON.parse(fileContent.toString());
                if (err) {
                    console.error(err);
                    return;
                }
                var deleteItemQty = cart.products.find(function (prod) { return prod.id === id; }).qty;
                var updateProduct = cart.products.filter(function (prod) { return prod.id !== id; });
                var updatePrice = cart.totalPrice - Number(productPrice) * deleteItemQty;
                var updateCart = { products: updateProduct, totalPrice: updatePrice };
                fs_1["default"].writeFile(p, JSON.stringify(updateCart), function (err) {
                    if (err) {
                        console.error(err);
                    }
                });
            }
        });
    };
    return CartModel;
}());
exports["default"] = CartModel;
//# sourceMappingURL=cart.js.map