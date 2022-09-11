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
      validationErrors: [],
    };
    res.render("./admin/edit-product", contexts);
  }

  static postAddProduct(req: Request, res: Response, next: NextFunction) {
    const userDTO = JSON.parse(JSON.stringify(req.body));
    const errors = validationResult(req);
    const image = req.file;

    /** 클라이언트에서 전달받은 파일이 이미지가 아닐경우 */
    if (!image) {
      const contexts = {
        product: {
          title: userDTO.title,
          price: userDTO.price,
          description: userDTO.description,
        },
        path: "/add-product",
        pageTitle: "Add Product ",
        editing: false,
        hasError: true,
        errorMessage: "Attached File is not an image",
        validationErrors: [],
      };

      return res.status(422).render("admin/edit-product", contexts);
    }

    /** 유효성검증에 실패한 경우 */
    if (!errors.isEmpty()) {
      const contexts = {
        product: {
          title: userDTO.title,
          price: userDTO.price,
          description: userDTO.description,
        },
        path: "/add-product",
        pageTitle: "Add Product",
        editing: false,
        hasError: true,
        errorMessage: errors.array()[0].msg,
        validationErrors: errors.array(),
      };

      return res.status(422).render("admin/edit-product", contexts);
    }

    const imageUrl = image.path;

    const product = new ProductModel({
      title: userDTO.title,
      price: userDTO.price,
      imageUrl,
      description: userDTO.description,
      userId: res.locals.user._id,
    });

    product
      .save()
      .then((result) => res.redirect("/"))
      .catch((err: any) => {
        const error = err;
        error.httpStatusCode = 500;
        return next(error);
      });
  }

  static getEditProduct(req: Request, res: Response, next: NextFunction) {
    const editMode = req.query.edit;
    if (!editMode) {
      return res.redirect("/");
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
          validationErrors: [],
        };
        res.render("./admin/edit-product", contexts);
      })
      .catch((err) => console.error(err));
  }

  static postEditProduct(req: Request, res: Response, next: NextFunction) {
    const userDTO = req.body;
    const image = req.file;
    const errors = validationResult(req);

    /** 클라이언트에서 전달받은 파일이 이미지가 아닐경우 */
    if (!image) {
      const contexts = {
        product: {
          title: userDTO.title,
          price: userDTO.price,
          description: userDTO.description,
        },
        path: "/edit-product",
        pageTitle: "Edit Product ",
        editing: true,
        hasError: true,
        errorMessage: "Attached File is not an image",
        validationErrors: [],
      };

      return res.status(422).render("admin/edit-product", contexts);
    }

    /** 유효성검증에 실패한 경우 */
    if (!errors.isEmpty()) {
      const contexts = {
        product: {
          title: userDTO.title,
          price: userDTO.price,
          description: userDTO.description,
          _id: userDTO.productId,
        },
        path: "/edit-product",
        pageTitle: "Edit Title",
        editing: true,
        hasError: true,
        errorMessage: errors.array()[0].msg,
        validationErrors: errors.array(),
      };

      return res.status(422).render("admin/edit-product", contexts);
    }

    ProductModel.findById(userDTO.productId)
      .then((product) => {
        if (!res.locals.user._id.equals(product.userId)) {
          return res.redirect("/");
        }

        /** 새로운 파일 업로드가 있을경우만 수정 */
        product.title = userDTO.title;
        if (image) {
          product.imageUrl = image.path;
        }
        product.price = userDTO.price;
        product.description = userDTO.description;

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
    const { productId } = req.params;
    ProductModel.deleteOne({ _id: new ObjectId(productId), userId: res.locals.user._id })
      .then(() => {
        res.status(200).json({ message: "Success" });
      })
      .catch((err) => {
        res.status(500).json({ message: "Deleting product failed" });
      });
  }
}

export default ProductController;
