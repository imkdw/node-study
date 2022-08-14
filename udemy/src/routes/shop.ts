import express from "express";
import ShopController from "../controllers/shop";

const shopRouter = express.Router();

/** / => GET */
shopRouter.get("/", ShopController.getIndex);

/** /products => GET */
shopRouter.get("/products", ShopController.getProducts);

/** /cart => GET */
shopRouter.get("/cart", ShopController.getCart);

/** /checkout => GET */
shopRouter.get("/checkout", ShopController.getCheckOut);

/** /orders => GET */
shopRouter.get("/orders", ShopController.getOrders);

export default shopRouter;
