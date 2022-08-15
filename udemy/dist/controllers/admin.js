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
            editing: false
        };
        res.render("./admin/edit-product", contexts);
    };
    ProductController.postAddProduct = function (req, res, next) {
        var userDTO = JSON.parse(JSON.stringify(req.body));
        var product = new product_1["default"](userDTO);
        product
            .save()
            .then(function () { return res.redirect("/"); })["catch"](function (err) { return console.error(err); });
    };
    ProductController.getEditProduct = function (req, res, next) {
        var editMode = req.query.edit;
        if (!editMode) {
            res.redirect("/");
            return;
        }
        var prodId = req.params.productId;
        product_1["default"].findById(prodId, function (product) {
            var contexts = {
                product: product,
                path: "/edit-product",
                pageTitle: "Edit Title",
                editing: editMode
            };
            res.render("./admin/edit-product", contexts);
        });
    };
    ProductController.postEditProduct = function (req, res, next) {
        var userDTO = req.body;
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
    ProductController.deleteProdcut = function (req, res, next) {
        var productId = req.body.productId;
        product_1["default"].deleteById(productId, function () {
            res.redirect("/");
        });
    };
    return ProductController;
}());
exports["default"] = ProductController;
//# sourceMappingURL=admin.js.map