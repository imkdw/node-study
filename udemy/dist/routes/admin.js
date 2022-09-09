"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var admin_1 = __importDefault(require("../controllers/admin"));
var is_auth_1 = require("../middleware/is-auth");
var express_validator_1 = require("express-validator");
var adminRouter = express_1["default"].Router();
adminRouter.get("/add-product", is_auth_1.isAuth, admin_1["default"].getAddProduct);
adminRouter.post("/add-product", is_auth_1.isAuth, [
    (0, express_validator_1.body)("title").isAlphanumeric().isLength({ min: 3 }).trim().withMessage("Title must be least 3 letters"),
    (0, express_validator_1.body)("imageUrl").isURL().withMessage("imageUrl Must be Type of URL"),
    (0, express_validator_1.body)("price").isFloat().withMessage("price must be type of float"),
    (0, express_validator_1.body)("description").isLength({ min: 5, max: 400 }).trim().withMessage("description must be 3~400 letters"),
], admin_1["default"].postAddProduct);
adminRouter.get("/products", is_auth_1.isAuth, [
    (0, express_validator_1.body)("title").isAlphanumeric().isLength({ min: 3 }).trim().withMessage("Title must be least 3 letters"),
    (0, express_validator_1.body)("imageUrl").isURL().withMessage("imageUrl Must be Type of URL"),
    (0, express_validator_1.body)("price").isFloat().withMessage("price must be type of float"),
    (0, express_validator_1.body)("description").isLength({ min: 5, max: 400 }).trim().withMessage("description must be 3~400 letters"),
], admin_1["default"].getProducts);
adminRouter.get("/edit-product/:productId", admin_1["default"].getEditProduct);
adminRouter.post("/edit-product", admin_1["default"].postEditProduct);
adminRouter.post("/delete-product", admin_1["default"].deleteProduct);
exports["default"] = adminRouter;
//# sourceMappingURL=admin.js.map