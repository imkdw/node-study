import { Request, Response, NextFunction } from "express";
import Product from "../models/product";

class ShopController {
  static getIndex = (req: Request, res: Response, next: NextFunction) => {
    Product.fetchAll().then((result) => {
      const contexts = {
        prods: result,
        pageTitle: "Shop",
        path: "/",
        hasProducts: result.length > 0,
      };
      res.render("./shop/index", contexts);
    });
  };

  static getProducts = (req: Request, res: Response, next: NextFunction) => {
    Product.fetchAll().then((result) => {
      const contexts = {
        prods: result,
        pageTitle: "All Products",
        path: "/products",
        hasProducts: result.length > 0,
      };
      res.render("./shop/product-list", contexts);
    });
  };

  static getCart = (req: Request, res: Response, next: NextFunction) => {
    // const contexts = {
    //   pageTitle: "Your Cart",
    //   path: "/cart",
    //   products: cartProducts,
    // };
    // res.render("./shop/cart", contexts);
  };

  // static getCheckOut = (req: Request, res: Response, next: NextFunction) => {
  //   const contexts = {
  //     pageTitle: "Checkout",
  //     path: "/checkout",
  //   };
  //   res.render("./shop/checkout", contexts);
  // };
  // static getOrders = (req: Request, res: Response, next: NextFunction) => {
  //   const contexts = {
  //     pageTitle: "Orders",
  //     path: "/orders",
  //   };
  //   res.render("./shop/orders", contexts);
  // };

  static getProduct = (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.productId;
    console.log(productId);
    Product.findById(productId)
      .then((result) => {
        const contexts = {
          product: result[0],
          pageTitle: "Product Details",
          path: `/products`,
        };
        res.render("./shop/product-detail", contexts);
      })
      .catch((err) => console.error(err));
  };

  // static postCart = (req: Request, res: Response, next: NextFunction) => {
  //   const { productId, productPrice } = req.body;
  //   ProductModel.findById(productId, (product) => {
  //     CartModel.addProduct(productId, productPrice);
  //   });
  //   res.redirect("/");
  // };
  // static postCartDeleteItem = (
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ) => {
  //   const { productId } = req.body;
  //   ProductModel.findById(productId, (product) => {
  //     CartModel.deleteProduct(productId, product.price);
  //     res.redirect("/cart");
  //   });
  // };
}

export default ShopController;
