import { Request, Response, NextFunction } from "express";
import { orderModel } from "../models/order";
import { ProductModel } from "../models/product";

class ShopController {
  static getIndex = (req: Request, res: Response, next: NextFunction) => {
    ProductModel.find().then((products) => {
      const contexts = {
        prods: products,
        pageTitle: "Shop",
        path: "/",
        hasProducts: products.length > 0,
        isAuthenticated: req.session.isLoggedIn,
      };

      res.render("./shop/index", contexts);
    });
  };

  static getProducts = (req: Request, res: Response, next: NextFunction) => {
    ProductModel.find().then((products) => {
      const contexts = {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
        hasProducts: products.length > 0,
        isAuthenticated: req.session.isLoggedIn,
      };

      res.render("./shop/product-list", contexts);
    });
  };

  static getCart = async (req: Request, res: Response, next: NextFunction) => {
    res.locals.user
      .populate("cart.items.productId")
      .then((result) => {
        const contexts = {
          pageTitle: "Your Cart",
          path: "/cart",
          products: result.cart.items,
          isAuthenticated: req.session.isLoggedIn,
        };
        res.render("./shop/cart", contexts);
      })
      .catch((err) => console.error(err));
  };

  // // static getCheckOut = (req: Request, res: Response, next: NextFunction) => {
  // //   const contexts = {
  // //     pageTitle: "Checkout",
  // //     path: "/checkout",
  // //   };
  // //   res.render("./shop/checkout", contexts);
  // // };

  static getOrders = (req: Request, res: Response, next: NextFunction) => {
    const contexts = {
      pageTitle: "Orders",
      path: "/orders",
      isAuthenticated: req.session.isLoggedIn,
    };
    res.render("./shop/orders", contexts);
  };

  static getProduct = (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.productId;

    ProductModel.findById(productId)
      .then((product) => {
        const contexts = {
          product: product,
          pageTitle: "Product Details",
          path: `/products`,
          isAuthenticated: req.session.isLoggedIn,
        };

        res.render("./shop/product-detail", contexts);
      })
      .catch((err) => console.error(err));
  };

  static postCart = (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.body;
    ProductModel.findById(productId)
      .then((product) => {
        res.locals.user
          .addToCart(product)
          .then((result) => res.redirect("cart"))
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  };

  static postCartDeleteItem = (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.body;
    res.locals.user
      .removeFromCart(productId)
      .then((result) => res.redirect("cart"))
      .catch((err) => console.error(err));
  };

  static postOrder = (req: Request, res: Response, next: NextFunction) => {
    res.locals.user
      .populate("cart.items.productId")
      .then((user) => {
        const products = user.cart.items.map((i) => {
          return { quantity: i.quantity, product: i.productId };
        });

        const order = new orderModel({
          user: {
            name: res.locals.user.name,
            userId: res.locals,
          },
          products: products,
        });

        return order.save();
      })
      .then((result) => {
        res.redirect("/orders");
      })
      .catch((err) => console.error(err));
  };
}

export default ShopController;
