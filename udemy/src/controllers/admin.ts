import { NextFunction, Request, Response } from "express";
import ProductModel from "../models/product";

class ProductController {
  static getAddProduct(req: Request, res: Response, next: NextFunction) {
    const contexts = {
      pageTitle: "Add product",
      path: "/admin/add-product",
      activeAddProduct: true,
      productCSS: true,
      formsCSS: true,
    };

    res.render("./admin/add-product", contexts);
  }

  static postAddProduct(req: Request, res: Response, next: NextFunction) {
    const userDTO = JSON.parse(JSON.stringify(req.body));
    const product = new ProductModel(userDTO);
    product.save();
    res.redirect("/");
  }

  static getProducts(req: Request, res: Response, next: NextFunction) {
    ProductModel.fetchAll((product) => {
      const contexts = {
        pageTitle: "Admin Products",
        prods: product,
        path: "/admin/products",
      };

      res.render("./admin/products", contexts);
    });
  }
}

export default ProductController;
