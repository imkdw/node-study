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
var cart_1 = __importDefault(require("../models/cart"));
var product_1 = __importDefault(require("../models/product"));
var ShopController = /** @class */ (function () {
    function ShopController() {
    }
    ShopController.getIndex = function (req, res, next) {
        product_1["default"].databaseFetchAll()
            .then(function (result) {
            var product = result[0];
            var contexts = {
                prods: product,
                pageTitle: "Shop",
                path: "/",
                hasProducts: product.length > 0
            };
            res.render("./shop/index", contexts);
        })["catch"](function (err) { return console.error(err); });
    };
    ShopController.getProducts = function (req, res, next) {
        product_1["default"].databaseFetchAll()
            .then(function (result) {
            var product = result[0];
            var contexts = {
                prods: product,
                pageTitle: "All Products",
                path: "/products",
                hasProducts: product.length > 0
            };
            res.render("./shop/product-list", contexts);
        })["catch"](function (err) { return console.error(err); });
    };
    ShopController.getCart = function (req, res, next) {
        /**
         * 1. 모든 장바구니 목록 가져오기 / CartModel.getCart(cb)
         * 2. 모든 상품 목록 가져오기 / ProductModel.fetchAll(cb)
         * 3.
         */
        cart_1["default"].getCart(function (cart) {
            product_1["default"].fetchAll(function (products) {
                var cartProducts = [];
                var _loop_1 = function (product) {
                    var cartProductData = cart.products.find(function (prod) { return prod.id === product.id; });
                    if (cartProductData) {
                        cartProducts.push({
                            productData: __assign({}, product),
                            qty: cartProductData.qty
                        });
                    }
                };
                for (var _i = 0, products_1 = products; _i < products_1.length; _i++) {
                    var product = products_1[_i];
                    _loop_1(product);
                }
                var contexts = {
                    pageTitle: "Your Cart",
                    path: "/cart",
                    products: cartProducts
                };
                res.render("./shop/cart", contexts);
            });
        });
    };
    ShopController.getCheckOut = function (req, res, next) {
        var contexts = {
            pageTitle: "Checkout",
            path: "/checkout"
        };
        res.render("./shop/checkout", contexts);
    };
    ShopController.getOrders = function (req, res, next) {
        var contexts = {
            pageTitle: "Orders",
            path: "/orders"
        };
        res.render("./shop/orders", contexts);
    };
    ShopController.getProduct = function (req, res, next) {
        var prodId = req.params.productId;
        product_1["default"].dbFindById(prodId)
            .then(function (result) {
            var product = result[0];
            var contexts = {
                product: product[0],
                pageTitle: "Product Details",
                path: "/products"
            };
            res.render("./shop/product-detail", contexts);
        })["catch"](function (err) { return console.error(err); });
    };
    ShopController.postCart = function (req, res, next) {
        var _a = req.body, productId = _a.productId, productPrice = _a.productPrice;
        product_1["default"].findById(productId, function (product) {
            cart_1["default"].addProduct(productId, productPrice);
        });
        res.redirect("/");
    };
    ShopController.postCartDeleteItem = function (req, res, next) {
        var productId = req.body.productId;
        product_1["default"].findById(productId, function (product) {
            cart_1["default"].deleteProduct(productId, product.price);
            res.redirect("/cart");
        });
    };
    return ShopController;
}());
exports["default"] = ShopController;
//# sourceMappingURL=shop.js.map