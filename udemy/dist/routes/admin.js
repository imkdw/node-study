"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.products = void 0;
var express_1 = __importDefault(require("express"));
var adminRouter = express_1["default"].Router();
adminRouter.get("/add-product", function (req, res, next) {
    var contexts = {
        pageTitle: "Add product",
        path: "/admin/add-product",
        activeAddProduct: true,
        productCSS: true,
        formsCSS: true
    };
    res.render("add-product", contexts);
});
exports.products = [];
adminRouter.post("/product", function (req, res, next) {
    var title = JSON.parse(JSON.stringify(req.body));
    exports.products.push(title);
    res.redirect("/");
});
exports["default"] = adminRouter;
//# sourceMappingURL=admin.js.map