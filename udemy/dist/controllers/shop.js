"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var product_1 = __importDefault(require("../models/product"));
var ShopController = /** @class */ (function () {
    function ShopController() {
    }
    ShopController.getIndex = function (req, res, next) {
        var products = product_1["default"].fetchAll(function (product) {
            var contexts = {
                prods: product,
                pageTitle: "Shop",
                path: "/",
                hasProducts: product.length > 0
            };
            res.render("./shop/product-list", contexts);
        });
    };
    ShopController.getProducts = function (req, res, next) {
        var products = product_1["default"].fetchAll(function (product) {
            var contexts = {
                prods: product,
                pageTitle: "All Products",
                path: "/products",
                hasProducts: product.length > 0
            };
            res.render("./shop/product-list", contexts);
        });
    };
    ShopController.getCart = function (req, res, next) {
        var contexts = {
            pageTitle: "Your Cart",
            path: "/cart"
        };
        res.render("./shop/cart", contexts);
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
    return ShopController;
}());
exports["default"] = ShopController;
//# sourceMappingURL=shop.js.map