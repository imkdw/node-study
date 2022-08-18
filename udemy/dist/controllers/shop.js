"use strict";
exports.__esModule = true;
var product_1 = require("../models/product");
var ShopController = /** @class */ (function () {
    function ShopController() {
    }
    ShopController.getIndex = function (req, res, next) {
        product_1.Product.findAll()
            .then(function (result) {
            var contexts = {
                prods: result,
                pageTitle: "Shop",
                path: "/",
                hasProducts: result.length > 0
            };
            res.render("./shop/index", contexts);
        })["catch"](function (err) { return console.error(err); });
    };
    ShopController.getProducts = function (req, res, next) {
        product_1.Product.findAll().then(function (result) {
            var contexts = {
                prods: result,
                pageTitle: "All Products",
                path: "/products",
                hasProducts: result.length > 0
            };
            res.render("./shop/product-list", contexts);
        });
    };
    // static getCart = (req: Request, res: Response, next: NextFunction) => {
    //   /**
    //    * 1. 모든 장바구니 목록 가져오기 / CartModel.getCart(cb)
    //    * 2. 모든 상품 목록 가져오기 / ProductModel.fetchAll(cb)
    //    * 3.
    //   // CartModel.getCart((cart) => {
    //   //   ProductModel.fetchAll((products) => {
    //   //     const cartProducts = [];
    //   //     for (const product of products) {
    //   //       const cartProductData = cart.products.find(
    //   //         (prod) => prod.id === product.id
    //   //       );
    //   //       if (cartProductData) {
    //   //         cartProducts.push({
    //   //           productData: { ...product },
    //   //           qty: cartProductData.qty,
    //   //         });
    //   //       }
    //   //     }
    //   //     const contexts = {
    //   //       pageTitle: "Your Cart",
    //   //       path: "/cart",
    //   //       products: cartProducts,
    //   //     };
    //   //     res.render("./shop/cart", contexts);
    //   //   });
    //   // });
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
    ShopController.getProduct = function (req, res, next) {
        var prodId = req.params.productId;
        /** findByPk 메서드를 통한 방식 */
        product_1.Product.findByPk(prodId).then(function (result) {
            var contexts = {
                product: result,
                pageTitle: "Product Details",
                path: "/products"
            };
            res.render("./shop/product-detail", contexts);
        });
        /** findAll에 where 옵션을 통한 방식 */
        // Product.findAll({ where: { id: prodId } })
        //   .then((result) => {
        //     const contexts = {
        //       product: result[0],
        //       pageTitle: "Product Details",
        //       path: `/products`,
        //     };
        //     res.render("./shop/product-detail", contexts);
        //   })
        //   .catch((err) => console.error(err));
    };
    return ShopController;
}());
exports["default"] = ShopController;
//# sourceMappingURL=shop.js.map