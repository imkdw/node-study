import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";
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
    userDTO.productId = null;
    userDTO.userId = new ObjectId(res.locals.user[0]._id);

    const product = new Product(userDTO);

    product
      .save()
      .then((result) => res.redirect("/"))
      .catch((err) => {
        console.error(err);
      });
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
          product: result[0],
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

  static deleteProduct(req: Request, res: Response, next: NextFunction) {
    const { productId } = req.body;
    Product.deleteById(productId)
      .then(() => res.redirect("/"))
      .catch((err) => console.error(err));
  }
}

export default ProductController;
