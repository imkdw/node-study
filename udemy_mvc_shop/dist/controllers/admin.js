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
            },
            validationErrors: []
        };
        res.render("./admin/edit-product", contexts);
    };
    ProductController.postAddProduct = function (req, res, next) {
        var userDTO = JSON.parse(JSON.stringify(req.body));
        var errors = (0, express_validator_1.validationResult)(req);
        var image = req.file;
        /** 클라이언트에서 전달받은 파일이 이미지가 아닐경우 */
        if (!image) {
            var contexts = {
                product: {
                    title: userDTO.title,
                    price: userDTO.price,
                    description: userDTO.description
                },
                path: "/add-product",
                pageTitle: "Add Product ",
                editing: false,
                hasError: true,
                errorMessage: "Attached File is not an image",
                validationErrors: []
            };
            return res.status(422).render("admin/edit-product", contexts);
        }
        /** 유효성검증에 실패한 경우 */
        if (!errors.isEmpty()) {
            var contexts = {
                product: {
                    title: userDTO.title,
                    price: userDTO.price,
                    description: userDTO.description
                },
                path: "/add-product",
                pageTitle: "Add Product",
                editing: false,
                hasError: true,
                errorMessage: errors.array()[0].msg,
                validationErrors: errors.array()
            };
            return res.status(422).render("admin/edit-product", contexts);
        }
        var imageUrl = image.path;
        var product = new product_1.ProductModel({
            title: userDTO.title,
            price: userDTO.price,
            imageUrl: imageUrl,
            description: userDTO.description,
            userId: res.locals.user._id
        });
        product
            .save()
            .then(function (result) { return res.redirect("/"); })["catch"](function (err) {
            var error = err;
            error.httpStatusCode = 500;
            return next(error);
        });
    };
    ProductController.getEditProduct = function (req, res, next) {
        var editMode = req.query.edit;
        if (!editMode) {
            return res.redirect("/");
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
                errorMessage: null,
                validationErrors: []
            };
            res.render("./admin/edit-product", contexts);
        })["catch"](function (err) { return console.error(err); });
    };
    ProductController.postEditProduct = function (req, res, next) {
        var userDTO = req.body;
        var image = req.file;
        var errors = (0, express_validator_1.validationResult)(req);
        /** 클라이언트에서 전달받은 파일이 이미지가 아닐경우 */
        if (!image) {
            var contexts = {
                product: {
                    title: userDTO.title,
                    price: userDTO.price,
                    description: userDTO.description
                },
                path: "/edit-product",
                pageTitle: "Edit Product ",
                editing: true,
                hasError: true,
                errorMessage: "Attached File is not an image",
                validationErrors: []
            };
            return res.status(422).render("admin/edit-product", contexts);
        }
        /** 유효성검증에 실패한 경우 */
        if (!errors.isEmpty()) {
            var contexts = {
                product: {
                    title: userDTO.title,
                    price: userDTO.price,
                    description: userDTO.description,
                    _id: userDTO.productId
                },
                path: "/edit-product",
                pageTitle: "Edit Title",
                editing: true,
                hasError: true,
                errorMessage: errors.array()[0].msg,
                validationErrors: errors.array()
            };
            return res.status(422).render("admin/edit-product", contexts);
        }
        product_1.ProductModel.findById(userDTO.productId)
            .then(function (product) {
            if (!res.locals.user._id.equals(product.userId)) {
                return res.redirect("/");
            }
            /** 새로운 파일 업로드가 있을경우만 수정 */
            product.title = userDTO.title;
            if (image) {
                product.imageUrl = image.path;
            }
            product.price = userDTO.price;
            product.description = userDTO.description;
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
        var productId = req.params.productId;
        product_1.ProductModel.deleteOne({ _id: new mongodb_1.ObjectId(productId), userId: res.locals.user._id })
            .then(function () {
            res.status(200).json({ message: "Success" });
        })["catch"](function (err) {
            res.status(500).json({ message: "Deleting product failed" });
        });
    };
    return ProductController;
}());
exports["default"] = ProductController;
//# sourceMappingURL=admin.js.map