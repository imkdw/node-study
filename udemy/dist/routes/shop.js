"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var shop_1 = __importDefault(require("../controllers/shop"));
var is_auth_1 = require("../middleware/is-auth");
var shopRouter = express_1["default"].Router();
shopRouter.get("/", shop_1["default"].getIndex);
shopRouter.get("/products", shop_1["default"].getProducts);
shopRouter.get("/products/:productId", shop_1["default"].getProduct);
shopRouter.get("/cart", is_auth_1.isAuth, shop_1["default"].getCart);
shopRouter.post("/cart", is_auth_1.isAuth, shop_1["default"].postCart);
shopRouter.post("/cart-delete-item", is_auth_1.isAuth, shop_1["default"].postCartDeleteItem);
// shopRouter.get("/checkout", ShopController.getCheckOut);
shopRouter.get("/orders", is_auth_1.isAuth, shop_1["default"].getOrders);
exports["default"] = shopRouter;
//# sourceMappingURL=shop.js.map