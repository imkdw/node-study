"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var product_1 = __importDefault(require("../models/product"));
var ProductController = /** @class */ (function () {
    function ProductController() {
    }
    ProductController.getAddProduct = function (req, res, next) {
        var contexts = {
            pageTitle: "Add product",
            path: "/admin/add-product",
            activeAddProduct: true,
            productCSS: true,
            formsCSS: true
        };
        res.render("./admin/add-product", contexts);
    };
    ProductController.postAddProduct = function (req, res, next) {
        var userDTO = JSON.parse(JSON.stringify(req.body));
        var product = new product_1["default"](userDTO);
        product.save();
        res.redirect("/");
    };
    ProductController.getProducts = function (req, res, next) {
        product_1["default"].fetchAll(function (product) {
            var contexts = {
                pageTitle: "Admin Products",
                prods: product,
                path: "/admin/products"
            };
            res.render("./admin/products", contexts);
        });
    };
    return ProductController;
}());
exports["default"] = ProductController;
//# sourceMappingURL=admin.js.map