import { NextFunction, Request, Response } from "express";
import { Product } from "../models/product";

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
    Product.create({
      title: userDTO.title,
      price: userDTO.price,
      imageUrl: userDTO.imageUrl,
      description: userDTO.description,
    })
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

    Product.findByPk(prodId).then((result) => {
      const contexts = {
        product: result,
        path: "/edit-product",
        pageTitle: "Edit Title",
        editing: editMode,
      };

      res.render("./admin/edit-product", contexts);
    });
  }

  static postEditProduct(req: Request, res: Response, next: NextFunction) {
    const userDTO = req.body;
    Product.update(
      {
        title: userDTO.title,
        price: userDTO.price,
        imageUrl: userDTO.imageUrl,
        description: userDTO.description,
      },
      {
        where: { id: userDTO.productId },
      }
    )
      .then((result) => res.redirect("/"))
      .catch((err) => console.error(err));
  }

  static getProducts(req: Request, res: Response, next: NextFunction) {
    Product.findAll().then((result) => {
      const contexts = {
        pageTitle: "Admin Products",
        prods: result,
        path: "/admin/products",
      };

      res.render("./admin/products", contexts);
    });
  }

  static deleteProdcut(req: Request, res: Response, next: NextFunction) {
    const { productId } = req.body;
    Product.destroy({
      where: { id: productId },
    })
      .then(() => res.redirect("/"))
      .catch((err) => console.error(err));
  }
}

export default ProductController;
