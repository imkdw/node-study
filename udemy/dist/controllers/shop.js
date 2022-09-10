"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var order_1 = require("../models/order");
var product_1 = require("../models/product");
/** 페이지네이션 구성시 페이지당 표시할 항목 개수 */
var ITEMS_PER_PAGE = 3;
var ShopController = /** @class */ (function () {
    function ShopController() {
    }
    var _a;
    _a = ShopController;
    ShopController.getIndex = function (req, res, next) {
        var page = Number(req.query.page);
        var totalItems;
        product_1.ProductModel.find()
            .countDocuments()
            .then(function (numProducts) {
            totalItems = numProducts;
            return product_1.ProductModel.find()
                .skip((page - 1) * ITEMS_PER_PAGE)
                .limit(ITEMS_PER_PAGE);
        })
            .then(function (products) {
            var contexts = {
                prods: products,
                pageTitle: "Shop",
                path: "/",
                currentPage: page,
                hasProducts: products.length > 0,
                isAuthenticated: req.session.isLoggedIn,
                totalProducts: totalItems,
                hasNextPage: ITEMS_PER_PAGE * page < totalItems,
                hasPrevPage: page > 1,
                nextPage: page + 1,
                prevPage: page - 1,
                lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
            };
            res.render("shop/index", contexts);
        })["catch"](function (err) { return console.error(err); });
    };
    ShopController.getProducts = function (req, res, next) {
        var page = Number(req.query.page);
        var totalItems;
        product_1.ProductModel.find()
            .countDocuments()
            .then(function (numProducts) {
            totalItems = numProducts;
            return product_1.ProductModel.find()
                .skip((page - 1) * ITEMS_PER_PAGE)
                .limit(ITEMS_PER_PAGE);
        })
            .then(function (products) {
            var contexts = {
                prods: products,
                pageTitle: "Products",
                path: "/products",
                currentPage: page,
                hasProducts: products.length > 0,
                isAuthenticated: req.session.isLoggedIn,
                totalProducts: totalItems,
                hasNextPage: ITEMS_PER_PAGE * page < totalItems,
                hasPrevPage: page > 1,
                nextPage: page + 1,
                prevPage: page - 1,
                lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
            };
            res.render("shop/product-list", contexts);
        })["catch"](function (err) { return console.error(err); });
    };
    ShopController.getCart = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(_a, function (_b) {
            res.locals.user
                .populate("cart.items.productId")
                .then(function (result) {
                var contexts = {
                    pageTitle: "Your Cart",
                    path: "/cart",
                    products: result.cart.items,
                    isAuthenticated: req.session.isLoggedIn
                };
                res.render("shop/cart", contexts);
            })["catch"](function (err) { return console.error(err); });
            return [2 /*return*/];
        });
    }); };
    // // static getCheckOut = (req: Request, res: Response, next: NextFunction) => {
    // //   const contexts = {
    // //     pageTitle: "Checkout",
    // //     path: "/checkout",
    // //   };
    // //   res.render("./shop/checkout", contexts);
    // // };
    ShopController.getOrders = function (req, res, next) {
        var contexts = {
            pageTitle: "Orders",
            path: "/orders",
            isAuthenticated: req.session.isLoggedIn
        };
        res.render("shop/orders", contexts);
    };
    ShopController.getProduct = function (req, res, next) {
        var productId = req.params.productId;
        product_1.ProductModel.findById(productId)
            .then(function (product) {
            var contexts = {
                product: product,
                pageTitle: "Product Details",
                path: "/products",
                isAuthenticated: req.session.isLoggedIn
            };
            res.render("shop/product-detail", contexts);
        })["catch"](function (err) { return console.error(err); });
    };
    ShopController.postCart = function (req, res, next) {
        var productId = req.body.productId;
        product_1.ProductModel.findById(productId)
            .then(function (product) {
            res.locals.user
                .addToCart(product)
                .then(function (result) { return res.redirect("cart"); })["catch"](function (err) { return console.error(err); });
        })["catch"](function (err) { return console.error(err); });
    };
    ShopController.postCartDeleteItem = function (req, res, next) {
        var productId = req.body.productId;
        res.locals.user
            .removeFromCart(productId)
            .then(function (result) { return res.redirect("cart"); })["catch"](function (err) { return console.error(err); });
    };
    ShopController.postOrder = function (req, res, next) {
        res.locals.user
            .populate("cart.items.productId")
            .then(function (user) {
            var products = user.cart.items.map(function (i) {
                return { quantity: i.quantity, product: i.productId };
            });
            var order = new order_1.orderModel({
                user: {
                    name: res.locals.user.name,
                    userId: res.locals
                },
                products: products
            });
            return order.save();
        })
            .then(function (result) {
            res.redirect("/orders");
        })["catch"](function (err) { return console.error(err); });
    };
    return ShopController;
}());
exports["default"] = ShopController;
//# sourceMappingURL=shop.js.map