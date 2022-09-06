import express from "express";
import ProductsController from "../controllers/admin";
import { isAuth } from "../middleware/is-auth";

const adminRouter = express.Router();

adminRouter.get("/add-product", isAuth, ProductsController.getAddProduct);
adminRouter.post("/add-product", ProductsController.postAddProduct);
adminRouter.get("/products", ProductsController.getProducts);

adminRouter.get("/edit-product/:productId", ProductsController.getEditProduct);
adminRouter.post("/edit-product", ProductsController.postEditProduct);
adminRouter.post("/delete-product", ProductsController.deleteProduct);

export default adminRouter;
