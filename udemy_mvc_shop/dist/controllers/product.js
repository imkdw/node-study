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
        var title = JSON.parse(JSON.stringify(req.body.title));
        var product = new product_1["default"](title);
        product.save();
        res.redirect("/");
    };
    ProductController.getProducts = function (req, res, next) { };
    return ProductController;
}());
exports["default"] = ProductController;
//# sourceMappingURL=product.js.map