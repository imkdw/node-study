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
        product_1.Product.create({
            title: userDTO.title,
            price: userDTO.price,
            imageUrl: userDTO.imageUrl,
            description: userDTO.description
        })
            .then(function (result) { return console.log("[SUCCESS] INSERT ".concat(userDTO.title)); })["catch"](function (err) { return console.error(err); });
    };
    // static getEditProduct(req: Request, res: Response, next: NextFunction) {
    //   const editMode = req.query.edit;
    //   if (!editMode) {
    //     res.redirect("/");
    //     return;
    //   }
    //   const prodId = req.params.productId;
    //   ProductModel.findById(prodId, (product) => {
    //     const contexts = {
    //       product: product,
    //       path: "/edit-product",
    //       pageTitle: "Edit Title",
    //       editing: editMode,
    //     };
    //     res.render("./admin/edit-product", contexts);
    //   });
    // }
    // static postEditProduct(req: Request, res: Response, next: NextFunction) {
    //   const userDTO = req.body;
    //   const product = new ProductModel(userDTO);
    //   product.save();
    //   res.redirect("/");
    // }
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
    return ProductController;
}());
exports["default"] = ProductController;
//# sourceMappingURL=admin.js.map