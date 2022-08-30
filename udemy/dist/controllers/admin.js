"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongodb_1 = require("mongodb");
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
        userDTO.productId = null;
        userDTO.userId = new mongodb_1.ObjectId(res.locals.user[0]._id);
        var product = new product_1["default"](userDTO);
        product
            .save()
            .then(function (result) { return res.redirect("/"); })["catch"](function (err) {
            console.error(err);
        });
    };
    ProductController.getEditProduct = function (req, res, next) {
        var editMode = req.query.edit;
        if (!editMode) {
            res.redirect("/");
            return;
        }
        var prodId = req.params.productId;
        product_1["default"].findById(prodId)
            .then(function (result) {
            var contexts = {
                product: result[0],
                path: "/edit-product",
                pageTitle: "Edit Title",
                editing: editMode
            };
            res.render("./admin/edit-product", contexts);
        })["catch"](function (err) { return console.error(err); });
    };
    ProductController.postEditProduct = function (req, res, next) {
        var userDTO = req.body;
        var product = new product_1["default"](userDTO);
        product
            .save()
            .then(function () { return res.redirect("/"); })["catch"](function (err) { return console.error(err); });
    };
    ProductController.getProducts = function (req, res, next) {
        product_1["default"].fetchAll()
            .then(function (result) {
            var contexts = {
                pageTitle: "Admin Products",
                prods: result,
                path: "/admin/products"
            };
            res.render("./admin/products", contexts);
        })["catch"](function (err) { return console.error(err); });
    };
    ProductController.deleteProduct = function (req, res, next) {
        var productId = req.body.productId;
        product_1["default"].deleteById(productId)
            .then(function () { return res.redirect("/"); })["catch"](function (err) { return console.error(err); });
    };
    return ProductController;
}());
exports["default"] = ProductController;
//# sourceMappingURL=admin.js.map