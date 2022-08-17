import express from "express";
import bodyParser from "body-parser";
import path from "path";

import adminRouter from "./routes/admin";
import shopRouter from "./routes/shop";
import ErrorController from "./controllers/error";

import { sequelize } from "./util/database";
import { Product } from "./models/product";
import User from "./models/user";

const app = express();

/** Setting View Engine - EJS */
app.set("view engine", "ejs");

/** Setting Views Directory - Default is /views */
app.set("views", path.join(__dirname, "..", "src", "views"));

/** Setting Middleware */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "..", "src", "public")));

/** Setting Routers */
app.use(shopRouter);
app.use("/admin", adminRouter);

/** etc */
app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
    })
    .catch((err) => console.error(err));
});

/** 404(Not Found) Error Handleing */
app.use(ErrorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

// Product.sync();
// User.sync();

sequelize
  .sync()
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({
        name: "max",
        email: "test@test.com",
      });
    }

    return Promise.resolve(user);
  })
  .then((user) => {
    // console.log(user);
    app.listen(3000);
  })
  .catch((err) => console.error(err));
