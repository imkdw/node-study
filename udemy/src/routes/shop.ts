import express from "express";
import ShopController from "../controllers/shop";

const shopRouter = express.Router();

shopRouter.get("/", ShopController.getIndex);

shopRouter.get("/products", ShopController.getProducts);

shopRouter.get("/cart", ShopController.getCart);

shopRouter.post("/cart", ShopController.postCart);

shopRouter.post("/cart-delete-item", ShopController.postCartDeleteItem);

// shopRouter.get("/checkout", ShopController.getCheckOut);

shopRouter.get("/orders", ShopController.getOrders);

shopRouter.get("/products/:productId", ShopController.getProduct);

export default shopRouter;
