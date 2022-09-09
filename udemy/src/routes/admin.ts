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
    body("title").isAlphanumeric().isLength({ min: 3 }).trim().withMessage("Title must be least 3 letters"),
    body("imageUrl").isURL().withMessage("imageUrl Must be Type of URL"),
    body("price").isFloat().withMessage("price must be type of float"),
    body("description").isLength({ min: 5, max: 400 }).trim().withMessage("description must be 3~400 letters"),
  ],
  ProductsController.postAddProduct
);

adminRouter.get(
  "/products",
  isAuth,
  [
    body("title").isAlphanumeric().isLength({ min: 3 }).trim().withMessage("Title must be least 3 letters"),
    body("imageUrl").isURL().withMessage("imageUrl Must be Type of URL"),
    body("price").isFloat().withMessage("price must be type of float"),
    body("description").isLength({ min: 5, max: 400 }).trim().withMessage("description must be 3~400 letters"),
  ],
  ProductsController.getProducts
);

adminRouter.get("/edit-product/:productId", ProductsController.getEditProduct);
adminRouter.post("/edit-product", ProductsController.postEditProduct);
adminRouter.post("/delete-product", ProductsController.deleteProduct);

export default adminRouter;
