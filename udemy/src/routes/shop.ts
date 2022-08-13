import express from "express";
import { products } from "./admin";

const shopRouter = express.Router();

shopRouter.get("/", (req, res, next) => {
  const contexts = {
    prods: products,
    pageTitle: "Shop",
    path: "/",
    hasProducts: products.length > 0,
    activeShop: true,
  };
  res.render("shop", contexts);
});

export default shopRouter;
