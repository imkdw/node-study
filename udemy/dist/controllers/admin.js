"use strict";
exports.__esModule = true;
var mongodb_1 = require("mongodb");
var product_1 = require("../models/product");
var express_validator_1 = require("express-validator");
var ProductController = /** @class */ (function () {
    function ProductController() {
    }
    ProductController.getAddProduct = function (req, res, next) {
        var contexts = {
            pageTitle: "Add product",
            path: "/admin/add-product",
            editing: false,
            hasError: true,
            errorMessage: null,
            product: {
                title: "",
                price: "",
                description: "",
                imageUrl: ""
            }
        };
        res.render("./admin/edit-product", contexts);
    };
    ProductController.postAddProduct = function (req, res, next) {
        var userDTO = JSON.parse(JSON.stringify(req.body));
        console.log(userDTO);
        var errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            var contexts = {
                product: {
                    title: userDTO.title,
                    price: userDTO.price,
                    description: userDTO.description,
                    imageUrl: userDTO.imageUrl
                },
                path: "/edit-product",
                pageTitle: "Edit Title",
                editing: false,
                hasError: true,
                errorMessage: errors.array()[0].msg
            };
            return res.status(422).render("admin/edit-product", contexts);
        }
        var product = new product_1.ProductModel({
            title: userDTO.title,
            price: userDTO.price,
            description: userDTO.description,
            imageUrl: userDTO.imageUrl,
            userId: res.locals.user._id
        });
        console.log(product);
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
                editing: editMode,
                hasError: false,
                errorMessage: null
            };
            res.render("./admin/edit-product", contexts);
        })["catch"](function (err) { return console.error(err); });
    };
    ProductController.postEditProduct = function (req, res, next) {
        var userDTO = req.body;
        product_1.ProductModel.findById(userDTO.productId)
            .then(function (product) {
            if (!res.locals.user._id.equals(product.userId)) {
                return res.redirect("/");
            }
            (product.title = userDTO.title),
                (product.imageUrl = userDTO.imageUrl),
                (product.price = userDTO.price),
                (product.description = userDTO.description);
            return product
                .save()
                .then(function (result) { return res.redirect("/"); })["catch"](function (err) { return console.error(err); });
        })["catch"](function (err) { return console.error(err); });
    };
    ProductController.getProducts = function (req, res, next) {
        product_1.ProductModel.find({ userId: res.locals.user._id })
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
        product_1.ProductModel.deleteOne({ _id: new mongodb_1.ObjectId(productId), userId: res.locals.user._id })
            .then(function () { return res.redirect("/"); })["catch"](function (err) { return console.error(err); });
    };
    return ProductController;
}());
exports["default"] = ProductController;
//# sourceMappingURL=admin.js.map