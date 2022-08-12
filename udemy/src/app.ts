import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/app-product", (req, res, next) => {
  res.send(
    `<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>`
  );
});

app.post("/product", (req, res, next) => {
  console.log(JSON.parse(JSON.stringify(req.body)));
  res.redirect("/");
});

app.use("/", (req, res, next) => {
  res.send("<h1>Hello Express!</h1><br><a href='/app-product'>app-product</a>");
});

app.listen(3000);
