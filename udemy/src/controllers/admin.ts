import { NextFunction, Request, Response } from "express";
import ProductModel from "../models/product";

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
    const product = new ProductModel(userDTO);
    product
      .save()
      .then(() => res.redirect("/"))
      .catch((err) => console.error(err));
  }

  static getEditProduct(req: Request, res: Response, next: NextFunction) {
    const editMode = req.query.edit;

    if (!editMode) {
      res.redirect("/");
      return;
    }

    const prodId = req.params.productId;

    ProductModel.findById(prodId, (product) => {
      const contexts = {
        product: product,
        path: "/edit-product",
        pageTitle: "Edit Title",
        editing: editMode,
      };

      res.render("./admin/edit-product", contexts);
    });
  }

  static postEditProduct(req: Request, res: Response, next: NextFunction) {
    const userDTO = req.body;
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

  static deleteProdcut(req: Request, res: Response, next: NextFunction) {
    const { productId } = req.body;
    ProductModel.deleteById(productId, () => {
      res.redirect("/");
    });
  }
}

export default ProductController;
