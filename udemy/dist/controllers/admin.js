"use strict";
exports.__esModule = true;
var product_1 = require("../models/product");
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
        res.locals.user
            .createProduct({
            title: userDTO.title,
            price: userDTO.price,
            imageUrl: userDTO.imageUrl,
            description: userDTO.description
        })
            .then(function (result) {
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
        product_1.Product.findByPk(prodId).then(function (result) {
            var contexts = {
                product: result,
                path: "/edit-product",
                pageTitle: "Edit Title",
                editing: editMode
            };
            res.render("./admin/edit-product", contexts);
        });
    };
    ProductController.postEditProduct = function (req, res, next) {
        var userDTO = req.body;
        product_1.Product.update({
            title: userDTO.title,
            price: userDTO.price,
            imageUrl: userDTO.imageUrl,
            description: userDTO.description
        }, {
            where: { id: userDTO.productId }
        })
            .then(function (result) { return res.redirect("/"); })["catch"](function (err) { return console.error(err); });
    };
    ProductController.getProducts = function (req, res, next) {
        product_1.Product.findAll().then(function (result) {
            var contexts = {
                pageTitle: "Admin Products",
                prods: result,
                path: "/admin/products"
            };
            res.render("./admin/products", contexts);
        });
    };
    ProductController.deleteProdcut = function (req, res, next) {
        var productId = req.body.productId;
        product_1.Product.destroy({
            where: { id: productId }
        })
            .then(function () { return res.redirect("/"); })["catch"](function (err) { return console.error(err); });
    };
    return ProductController;
}());
exports["default"] = ProductController;
//# sourceMappingURL=admin.js.map