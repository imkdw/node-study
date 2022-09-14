import express from "express";
import ProductsController from "../controllers/admin";
import { isAuth } from "../middleware/is-auth";
import { body } from "express-validator";

const adminRouter = express.Router();

adminRouter.get("/add-product", isAuth, ProductsController.getAddProduct);
adminRouter.post(
  "/add-product",
  isAuth,
  [
    body("title").isString().isLength({ min: 3 }).trim().withMessage("Title must be least 3 letters"),
    body("price").isFloat().withMessage("price must be type of float"),
    body("description").isLength({ min: 5, max: 400 }).trim().withMessage("description must be 5~400 letters"),
  ],
  ProductsController.postAddProduct
);

adminRouter.get("/products", isAuth, ProductsController.getProducts);

adminRouter.get("/edit-product/:productId", ProductsController.getEditProduct);
adminRouter.post(
  "/edit-product",
  [
    body("title").isString().isLength({ min: 3 }).trim().withMessage("Title must be least 3 letters"),
    body("price").isFloat().withMessage("price must be type of float"),
    body("description").isLength({ min: 5, max: 400 }).trim().withMessage("description must be 5~400 letters"),
  ],
  ProductsController.postEditProduct
);
adminRouter.delete("/product/:productId", isAuth, ProductsController.deleteProduct);

export default adminRouter;
