"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var admin_1 = require("./admin");
var shopRouter = express_1["default"].Router();
shopRouter.get("/", function (req, res, next) {
    var contexts = {
        prods: admin_1.products,
        pageTitle: "Shop",
        path: "/",
        hasProducts: admin_1.products.length > 0,
        activeShop: true
    };
    res.render("shop", contexts);
});
exports["default"] = shopRouter;
//# sourceMappingURL=shop.js.map