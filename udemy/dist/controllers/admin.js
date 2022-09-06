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
        /** userDTO : title, price, imageUrl, description */
        var userDTO = JSON.parse(JSON.stringify(req.body));
        var product = new product_1.ProductModel({
            title: userDTO.title,
            price: userDTO.price,
            description: userDTO.description,
            imageUrl: userDTO.imageUrl,
            userId: res.locals.user._id
        });
        product
            .save()
            .then(function (result) { return res.redirect("/"); })["catch"](function (err) { return console.error(err); });
    };
    ProductController.getEditProduct = function (req, res, next) {
        var editMode = req.query.edit;
        if (!editMode) {
            res.redirect("/");
            return;
        }
        var prodId = req.params.productId;
        product_1.ProductModel.findById(prodId)
            .then(function (product) {
            var contexts = {
                product: product,
                path: "/edit-product",
                pageTitle: "Edit Title",
                editing: editMode
            };
            res.render("./admin/edit-product", contexts);
        })["catch"](function (err) { return console.error(err); });
    };
    ProductController.postEditProduct = function (req, res, next) {
        var userDTO = req.body;
        product_1.ProductModel.findById(userDTO.productId)
            .then(function (product) {
            (product.title = userDTO.title),
                (product.imageUrl = userDTO.imageUrl),
                (product.price = userDTO.price),
                (product.description = userDTO.description);
            product.save();
            res.redirect("/");
        })["catch"](function (err) { return console.error(err); });
    };
    ProductController.getProducts = function (req, res, next) {
        product_1.ProductModel.find()
            .then(function (products) {
            var contexts = {
                pageTitle: "Admin Products",
                prods: products,
                path: "/admin/products"
            };
            res.render("./admin/products", contexts);
        })["catch"](function (err) { return console.error(err); });
    };
    ProductController.deleteProduct = function (req, res, next) {
        var productId = req.body.productId;
        product_1.ProductModel.findByIdAndRemove(productId)
            .then(function () { return res.redirect("/"); })["catch"](function (err) { return console.error(err); });
    };
    return ProductController;
}());
exports["default"] = ProductController;
//# sourceMappingURL=admin.js.map