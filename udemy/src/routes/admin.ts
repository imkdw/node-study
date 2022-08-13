import express from "express";

const adminRouter = express.Router();

adminRouter.get("/add-product", (req, res, next) => {
  const contexts = {
    pageTitle: "Add product",
    path: "/admin/add-product",
    activeAddProduct: true,
    productCSS: true,
    formsCSS: true,
  };

  res.render("add-product", contexts);
});

export const products = [];

adminRouter.post("/product", (req, res, next) => {
  const title = JSON.parse(JSON.stringify(req.body));
  products.push(title);
  res.redirect("/");
});

export default adminRouter;
