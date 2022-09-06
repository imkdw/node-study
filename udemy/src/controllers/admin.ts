import { NextFunction, Request, Response } from "express";
import { ProductModel } from "../models/product";

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
    /** userDTO : title, price, imageUrl, description */
    const userDTO = JSON.parse(JSON.stringify(req.body));

    const product = new ProductModel({
      title: userDTO.title,
      price: userDTO.price,
      description: userDTO.description,
      imageUrl: userDTO.imageUrl,
      userId: res.locals.user._id,
    });

    product
      .save()
      .then((result) => res.redirect("/"))
      .catch((err) => console.error(err));
  }

  static getEditProduct(req: Request, res: Response, next: NextFunction) {
    const editMode = req.query.edit;
    if (!editMode) {
      res.redirect("/");
      return;
    }
    const prodId = req.params.productId;
    ProductModel.findById(prodId)
      .then((product) => {
        const contexts = {
          product: product,
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

    ProductModel.findById(userDTO.productId)
      .then((product) => {
        (product.title = userDTO.title),
          (product.imageUrl = userDTO.imageUrl),
          (product.price = userDTO.price),
          (product.description = userDTO.description);
        product.save();
        res.redirect("/");
      })
      .catch((err) => console.error(err));
  }

  static getProducts(req: Request, res: Response, next: NextFunction) {
    ProductModel.find()
      .then((products) => {
        const contexts = {
          pageTitle: "Admin Products",
          prods: products,
          path: "/admin/products",
        };
        res.render("./admin/products", contexts);
      })
      .catch((err) => console.error(err));
  }

  static deleteProduct(req: Request, res: Response, next: NextFunction) {
    const { productId } = req.body;
    ProductModel.findByIdAndRemove(productId)
      .then(() => res.redirect("/"))
      .catch((err) => console.error(err));
  }
}

export default ProductController;
