import { Request, Response, NextFunction } from "express";
import CartModel from "../models/cart";
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
    /**
     * 1. 모든 장바구니 목록 가져오기 / CartModel.getCart(cb)
     * 2. 모든 상품 목록 가져오기 / ProductModel.fetchAll(cb)
     * 3.
     */
    CartModel.getCart((cart) => {
      ProductModel.fetchAll((products) => {
        const cartProducts = [];
        for (const product of products) {
          const cartProductData = cart.products.find(
            (prod) => prod.id === product.id
          );

          if (cartProductData) {
            cartProducts.push({
              productData: { ...product },
              qty: cartProductData.qty,
            });
          }
        }

        const contexts = {
          pageTitle: "Your Cart",
          path: "/cart",
          products: cartProducts,
        };

        res.render("./shop/cart", contexts);
      });
    });
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

  static getProduct = (req: Request, res: Response, next: NextFunction) => {
    const prodId = req.params.productId;
    ProductModel.findById(prodId, (product) => {
      const contexts = {
        product: product,
        pageTitle: "Product Details",
        path: `/products`,
      };

      res.render("./shop/product-detail", contexts);
    });
  };

  static postCart = (req: Request, res: Response, next: NextFunction) => {
    const { productId, productPrice } = req.body;
    ProductModel.findById(productId, (product) => {
      CartModel.addProduct(productId, productPrice);
    });
    res.redirect("/");
  };

  static postCartDeleteItem = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { productId } = req.body;
    ProductModel.findById(productId, (product) => {
      CartModel.deleteProduct(productId, product.price);
      res.redirect("/cart");
    });
  };
}

export default ShopController;
