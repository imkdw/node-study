"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var admin_1 = __importDefault(require("../controllers/admin"));
var adminRouter = express_1["default"].Router();
adminRouter.get("/add-product", admin_1["default"].getAddProduct);
adminRouter.post("/add-product", admin_1["default"].postAddProduct);
adminRouter.get("/products", admin_1["default"].getProducts);
// adminRouter.get("/edit-product/:productId", ProductsController.getEditProduct);
// adminRouter.post("/edit-product", ProductsController.postEditProduct);
// adminRouter.post("/delete-product", ProductsController.deleteProdcut);
exports["default"] = adminRouter;
//# sourceMappingURL=admin.js.map