import { Request, Response, NextFunction } from "express";
import Product from "../models/product";
import User from "../models/user";

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

  static getCart = async (req: Request, res: Response, next: NextFunction) => {
    const { _id } = res.locals.user[0];
    User.getCart(_id)
      .then(async (result) => {
        const cartProducts = result[0].cart.items;
        const cartProductsId = cartProducts.map((cartProduct) => cartProduct.productId.toString());
        const products = [];
        let i = 0;

        for (const cartProductId of cartProductsId) {
          const product = await Product.findById(cartProductId);
          product[0].quantity = cartProducts[i].quantity;
          products.push(product[0]);
          i++;
        }

        const contexts = {
          pageTitle: "Your Cart",
          path: "/cart",
          products: products,
        };

        res.render("./shop/cart", contexts);
      })
      .catch((err) => console.error(err));
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

  static postCart = (req: Request, res: Response, next: NextFunction) => {
    const { productId, productPrice } = req.body;
    const { _id, name, email } = res.locals.user[0];

    Product.findById(productId)
      .then((product) => {
        const user = new User(name, email, _id);
        user
          .addToCart(product[0])
          .then((result) => {
            res.redirect("/cart");
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  };
}

export default ShopController;
