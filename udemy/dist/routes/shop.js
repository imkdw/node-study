"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var shop_1 = __importDefault(require("../controllers/shop"));
var shopRouter = express_1["default"].Router();
/** / => GET */
shopRouter.get("/", shop_1["default"].getIndex);
/** /products => GET */
shopRouter.get("/products", shop_1["default"].getProducts);
/** /cart => GET */
shopRouter.get("/cart", shop_1["default"].getCart);
/** /checkout => GET */
shopRouter.get("/checkout", shop_1["default"].getCheckOut);
/** /orders => GET */
shopRouter.get("/orders", shop_1["default"].getOrders);
exports["default"] = shopRouter;
//# sourceMappingURL=shop.js.map