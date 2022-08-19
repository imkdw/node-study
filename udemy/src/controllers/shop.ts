import { Request, Response, NextFunction } from "express";

class ShopController {
  // static getIndex = (req: Request, res: Response, next: NextFunction) => {
  //   Product.findAll()
  //     .then((result) => {
  //       const contexts = {
  //         prods: result,
  //         pageTitle: "Shop",
  //         path: "/",
  //         hasProducts: result.length > 0,
  //       };
  //       res.render("./shop/index", contexts);
  //     })
  //     .catch((err) => console.error(err));
  // };
  // static getProducts = (req: Request, res: Response, next: NextFunction) => {
  //   Product.findAll().then((result) => {
  //     const contexts = {
  //       prods: result,
  //       pageTitle: "All Products",
  //       path: "/products",
  //       hasProducts: result.length > 0,
  //     };
  //     res.render("./shop/product-list", contexts);
  //   });
  // };
  // static getCart = (req: Request, res: Response, next: NextFunction) => {
  //   res.locals.user.getCart().then((cart) => {
  //     return cart
  //       .getProducts()
  //       .then((products) => {
  //         const contexts = {
  //           pageTitle: "Your Cart",
  //           path: "/cart",
  //           products: products,
  //         };
  //         res.render();
  //       })
  //       .catch((err) => console.error(err));
  //   });
  //   CartModel.getCart((cart) => {
  //     ProductModel.fetchAll((products) => {
  //       const cartProducts = [];
  //       for (const product of products) {
  //         const cartProductData = cart.products.find(
  //           (prod) => prod.id === product.id
  //         );
  //         if (cartProductData) {
  //           cartProducts.push({
  //             productData: { ...product },
  //             qty: cartProductData.qty,
  //           });
  //         }
  //       }
  //       const contexts = {
  //         pageTitle: "Your Cart",
  //         path: "/cart",
  //         products: cartProducts,
  //       };
  //       res.render("./shop/cart", contexts);
  //     });
  //   });
  // };
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
  // static getProduct = (req: Request, res: Response, next: NextFunction) => {
  //   const prodId = req.params.productId;
  //   /** findByPk 메서드를 통한 방식 */
  //   Product.findByPk(prodId).then((result) => {
  //     const contexts = {
  //       product: result,
  //       pageTitle: "Product Details",
  //       path: `/products`,
  //     };
  //     res.render("./shop/product-detail", contexts);
  //   });
  //   /** findAll에 where 옵션을 통한 방식 */
  //   Product.findAll({ where: { id: prodId } })
  //     .then((result) => {
  //       const contexts = {
  //         product: result[0],
  //         pageTitle: "Product Details",
  //         path: `/products`,
  //       };
  //       res.render("./shop/product-detail", contexts);
  //     })
  //     .catch((err) => console.error(err));
  // };
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
