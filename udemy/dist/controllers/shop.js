"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var product_1 = __importDefault(require("../models/product"));
var user_1 = __importDefault(require("../models/user"));
var ShopController = /** @class */ (function () {
    function ShopController() {
    }
    ShopController.getIndex = function (req, res, next) {
        product_1["default"].fetchAll().then(function (result) {
            var contexts = {
                prods: result,
                pageTitle: "Shop",
                path: "/",
                hasProducts: result.length > 0
            };
            res.render("./shop/index", contexts);
        });
    };
    ShopController.getProducts = function (req, res, next) {
        product_1["default"].fetchAll().then(function (result) {
            var contexts = {
                prods: result,
                pageTitle: "All Products",
                path: "/products",
                hasProducts: result.length > 0
            };
            res.render("./shop/product-list", contexts);
        });
    };
    // static getCart = (req: Request, res: Response, next: NextFunction) => {
    //   const contexts = {
    //     pageTitle: "Your Cart",
    //     path: "/cart",
    //     products: cartProducts,
    //   };
    //   res.render("./shop/cart", contexts);
    // };
    // static getCheckOut = (req: Request, res: Response, next: NextFunction) => {
    //   const contexts = {
    //     pageTitle: "Checkout",
    //     path: "/checkout",
    //   };
    //   res.render("./shop/checkout", contexts);
    // };
    // static getOrders = (req: Request, res: Response, next: NextFunction) => {
    //   const contexts = {
    //     pageTitle: "Orders",
    //     path: "/orders",
    //   };
    //   res.render("./shop/orders", contexts);
    // };
    ShopController.getProduct = function (req, res, next) {
        var productId = req.params.productId;
        console.log(productId);
        product_1["default"].findById(productId)
            .then(function (result) {
            var contexts = {
                product: result[0],
                pageTitle: "Product Details",
                path: "/products"
            };
            res.render("./shop/product-detail", contexts);
        })["catch"](function (err) { return console.error(err); });
    };
    ShopController.postCart = function (req, res, next) {
        var _a = req.body, productId = _a.productId, productPrice = _a.productPrice;
        var _b = res.locals.user[0], _id = _b._id, name = _b.name, email = _b.email;
        product_1["default"].findById(productId)
            .then(function (product) {
            var user = new user_1["default"](name, email, _id);
            user
                .addToCart(product[0])
                .then(function (result) {
                res.redirect("/cart");
            })["catch"](function (err) { return console.error(err); });
        })["catch"](function (err) { return console.error(err); });
    };
    return ShopController;
}());
exports["default"] = ShopController;
//# sourceMappingURL=shop.js.map