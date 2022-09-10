import { Request, Response, NextFunction } from "express";
import { orderModel } from "../models/order";
import { ProductModel } from "../models/product";

/** 페이지네이션 구성시 페이지당 표시할 항목 개수 */
const ITEMS_PER_PAGE = 3;

class ShopController {
  static getIndex = (req: Request, res: Response, next: NextFunction) => {
    const page: number = Number(req.query.page);
    let totalItems;

    ProductModel.find()
      .countDocuments()
      .then((numProducts) => {
        totalItems = numProducts;

        return ProductModel.find()
          .skip((page - 1) * ITEMS_PER_PAGE)
          .limit(ITEMS_PER_PAGE);
      })
      .then((products) => {
        const contexts = {
          prods: products,
          pageTitle: "Shop",
          path: "/",
          currentPage: page,
          hasProducts: products.length > 0,
          isAuthenticated: req.session.isLoggedIn,
          totalProducts: totalItems,
          hasNextPage: ITEMS_PER_PAGE * page < totalItems,
          hasPrevPage: page > 1,
          nextPage: page + 1,
          prevPage: page - 1,
          lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
        };

        res.render("shop/index", contexts);
      })
      .catch((err) => console.error(err));
  };

  static getProducts = (req: Request, res: Response, next: NextFunction) => {
    const page: number = Number(req.query.page);
    let totalItems;

    ProductModel.find()
      .countDocuments()
      .then((numProducts) => {
        totalItems = numProducts;

        return ProductModel.find()
          .skip((page - 1) * ITEMS_PER_PAGE)
          .limit(ITEMS_PER_PAGE);
      })
      .then((products) => {
        const contexts = {
          prods: products,
          pageTitle: "Products",
          path: "/products",
          currentPage: page,
          hasProducts: products.length > 0,
          isAuthenticated: req.session.isLoggedIn,
          totalProducts: totalItems,
          hasNextPage: ITEMS_PER_PAGE * page < totalItems,
          hasPrevPage: page > 1,
          nextPage: page + 1,
          prevPage: page - 1,
          lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
        };

        res.render("shop/product-list", contexts);
      })
      .catch((err) => console.error(err));
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
        res.render("shop/cart", contexts);
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
    res.render("shop/orders", contexts);
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

        res.render("shop/product-detail", contexts);
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
