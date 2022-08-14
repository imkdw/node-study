import express from "express";
import ProductsController from "../controllers/admin";

const adminRouter = express.Router();

adminRouter.get("/add-product", ProductsController.getAddProduct);

adminRouter.post("/product", ProductsController.postAddProduct);

adminRouter.get("/products", ProductsController.getProducts);

export default adminRouter;
