import { Request, Response, NextFunction } from "express";
import ProductModel from "../models/product";

class ShopController {
  static getIndex = (req: Request, res: Response, next: NextFunction) => {
    const products = ProductModel.fetchAll((product) => {
      const contexts = {
        prods: product,
        pageTitle: "Shop",
        path: "/",
        hasProducts: product.length > 0,
      };

      res.render("./shop/product-list", contexts);
    });
  };

  static getProducts = (req: Request, res: Response, next: NextFunction) => {
    const products = ProductModel.fetchAll((product) => {
      const contexts = {
        prods: product,
        pageTitle: "All Products",
        path: "/products",
        hasProducts: product.length > 0,
      };

      res.render("./shop/product-list", contexts);
    });
  };

  static getCart = (req: Request, res: Response, next: NextFunction) => {
    const contexts = {
      pageTitle: "Your Cart",
      path: "/cart",
    };

    res.render("./shop/cart", contexts);
  };

  static getCheckOut = (req: Request, res: Response, next: NextFunction) => {
    const contexts = {
      pageTitle: "Checkout",
      path: "/checkout",
    };

    res.render("./shop/checkout", contexts);
  };

  static getOrders = (req: Request, res: Response, next: NextFunction) => {
    const contexts = {
      pageTitle: "Orders",
      path: "/orders",
    };

    res.render("./shop/orders", contexts);
  };
}

export default ShopController;
