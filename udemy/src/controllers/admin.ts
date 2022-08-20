import { NextFunction, Request, Response } from "express";
import Product from "../models/product";

class ProductController {
  static getAddProduct(req: Request, res: Response, next: NextFunction) {
    const contexts = {
      pageTitle: "Add product",
      path: "/admin/add-product",
      editing: false,
    };

    res.render("./admin/edit-product", contexts);
  }

  static postAddProduct(req: Request, res: Response, next: NextFunction) {
    const userDTO = JSON.parse(JSON.stringify(req.body));
    const product = new Product({ userId: res.locals.userId, ...userDTO });
    product
      .save()
      .then((result) => {
        console.log(result);
        res.redirect("/");
      })
      .catch((err) => console.error(err));
  }

  static getEditProduct(req: Request, res: Response, next: NextFunction) {
    const editMode = req.query.edit;

    if (!editMode) {
      res.redirect("/");
      return;
    }

    const prodId = req.params.productId;

    Product.findById(prodId)
      .then((result) => {
        const contexts = {
          product: result,
          path: "/edit-product",
          pageTitle: "Edit Title",
          editing: editMode,
        };

        res.render("./admin/edit-product", contexts);
      })
      .catch((err) => console.error(err));
  }

  static postEditProduct(req: Request, res: Response, next: NextFunction) {
    const userDTO = req.body;
    userDTO.userId = res.locals.userId;
    const product = new Product(userDTO);
    product
      .save()
      .then(() => res.redirect("/"))
      .catch((err) => console.error(err));
  }

  static getProducts(req: Request, res: Response, next: NextFunction) {
    Product.fetchAll()
      .then((result) => {
        const contexts = {
          pageTitle: "Admin Products",
          prods: result,
          path: "/admin/products",
        };
        res.render("./admin/products", contexts);
      })
      .catch((err) => console.error(err));
  }

  static deleteProdcut(req: Request, res: Response, next: NextFunction) {
    const { productId } = req.body;
    Product.deleteById(productId)
      .then(() => res.redirect("/"))
      .catch((err) => console.error(err));
  }
}

export default ProductController;
