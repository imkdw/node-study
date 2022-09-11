import express from "express";
import ShopController from "../controllers/shop";
import { isAuth } from "../middleware/is-auth";

const shopRouter = express.Router();

shopRouter.get("/", ShopController.getIndex);

shopRouter.get("/products", ShopController.getProducts);

shopRouter.get("/products/:productId", ShopController.getProduct);

shopRouter.get("/cart", isAuth, ShopController.getCart);

shopRouter.post("/cart", isAuth, ShopController.postCart);

shopRouter.post("/cart-delete-item", isAuth, ShopController.postCartDeleteItem);

// shopRouter.get("/checkout", ShopController.getCheckOut);

shopRouter.get("/orders", isAuth, ShopController.getOrders);

export default shopRouter;
