import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";
import { ProductModel } from "../models/product";
import { validationResult } from "express-validator";

class ProductController {
  static getAddProduct(req: Request, res: Response, next: NextFunction) {
    const contexts = {
      pageTitle: "Add product",
      path: "/admin/add-product",
      editing: false,
      hasError: true,
      errorMessage: null,
      product: {
        title: "",
        price: "",
        description: "",
        imageUrl: "",
      },
    };
    res.render("./admin/edit-product", contexts);
  }

  static postAddProduct(req: Request, res: Response, next: NextFunction) {
    const userDTO = JSON.parse(JSON.stringify(req.body));
    console.log(userDTO);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const contexts = {
        product: {
          title: userDTO.title,
          price: userDTO.price,
          description: userDTO.description,
          imageUrl: userDTO.imageUrl,
        },
        path: "/edit-product",
        pageTitle: "Edit Title",
        editing: false,
        hasError: true,
        errorMessage: errors.array()[0].msg,
      };

      return res.status(422).render("admin/edit-product", contexts);
    }

    const product = new ProductModel({
      title: userDTO.title,
      price: userDTO.price,
      description: userDTO.description,
      imageUrl: userDTO.imageUrl,
      userId: res.locals.user._id,
    });

    console.log(product);

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
          hasError: false,
          errorMessage: null,
        };
        res.render("./admin/edit-product", contexts);
      })
      .catch((err) => console.error(err));
  }

  static postEditProduct(req: Request, res: Response, next: NextFunction) {
    const userDTO = req.body;

    ProductModel.findById(userDTO.productId)
      .then((product) => {
        if (!res.locals.user._id.equals(product.userId)) {
          return res.redirect("/");
        }

        (product.title = userDTO.title),
          (product.imageUrl = userDTO.imageUrl),
          (product.price = userDTO.price),
          (product.description = userDTO.description);
        return product
          .save()
          .then((result) => res.redirect("/"))
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  }

  static getProducts(req: Request, res: Response, next: NextFunction) {
    ProductModel.find({ userId: res.locals.user._id })
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
    ProductModel.deleteOne({ _id: new ObjectId(productId), userId: res.locals.user._id })
      .then(() => res.redirect("/"))
      .catch((err) => console.error(err));
  }
}

export default ProductController;
