import express from "express";
import ProductsController from "../controllers/admin";

const adminRouter = express.Router();

adminRouter.get("/add-product", ProductsController.getAddProduct);

adminRouter.post("/add-product", ProductsController.postAddProduct);

adminRouter.get("/products", ProductsController.getProducts);

// adminRouter.get("/edit-product/:productId", ProductsController.getEditProduct);

// adminRouter.post("/edit-product", ProductsController.postEditProduct);

// adminRouter.post("/delete-product", ProductsController.deleteProdcut);

export default adminRouter;
