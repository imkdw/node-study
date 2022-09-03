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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var product_1 = __importDefault(require("../models/product"));
var user_1 = __importDefault(require("../models/user"));
var ShopController = /** @class */ (function () {
    function ShopController() {
    }
    var _a;
    _a = ShopController;
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
    ShopController.getCart = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var _id;
        return __generator(_a, function (_b) {
            _id = res.locals.user[0]._id;
            user_1["default"].getCart(_id)
                .then(function (result) { return __awaiter(void 0, void 0, void 0, function () {
                var cartProducts, cartProductsId, products, i, _i, cartProductsId_1, cartProductId, product, contexts;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            cartProducts = result[0].cart.items;
                            cartProductsId = cartProducts.map(function (cartProduct) { return cartProduct.productId.toString(); });
                            products = [];
                            i = 0;
                            _i = 0, cartProductsId_1 = cartProductsId;
                            _b.label = 1;
                        case 1:
                            if (!(_i < cartProductsId_1.length)) return [3 /*break*/, 4];
                            cartProductId = cartProductsId_1[_i];
                            return [4 /*yield*/, product_1["default"].findById(cartProductId)];
                        case 2:
                            product = _b.sent();
                            product[0].quantity = cartProducts[i].quantity;
                            products.push(product[0]);
                            i++;
                            _b.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4:
                            contexts = {
                                pageTitle: "Your Cart",
                                path: "/cart",
                                products: products
                            };
                            res.render("./shop/cart", contexts);
                            return [2 /*return*/];
                    }
                });
            }); })["catch"](function (err) { return console.error(err); });
            return [2 /*return*/];
        });
    }); };
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
        var _b = req.body, productId = _b.productId, productPrice = _b.productPrice;
        var _c = res.locals.user[0], _id = _c._id, name = _c.name, email = _c.email;
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