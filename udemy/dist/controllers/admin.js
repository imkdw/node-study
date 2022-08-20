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
        var product = new product_1["default"](__assign({ userId: res.locals.userId }, userDTO));
        product
            .save()
            .then(function (result) {
            console.log(result);
            res.redirect("/");
        })["catch"](function (err) { return console.error(err); });
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
                product: result,
                path: "/edit-product",
                pageTitle: "Edit Title",
                editing: editMode
            };
            res.render("./admin/edit-product", contexts);
        })["catch"](function (err) { return console.error(err); });
    };
    ProductController.postEditProduct = function (req, res, next) {
        var userDTO = req.body;
        userDTO.userId = res.locals.userId;
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
    ProductController.deleteProdcut = function (req, res, next) {
        var productId = req.body.productId;
        product_1["default"].deleteById(productId)
            .then(function () { return res.redirect("/"); })["catch"](function (err) { return console.error(err); });
    };
    return ProductController;
}());
exports["default"] = ProductController;
//# sourceMappingURL=admin.js.map