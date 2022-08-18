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

/** Dummy User Data */
app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      res.locals.user = user;
      console.log(user[0]);
      next();
    })
    .catch((err) => console.error(err));
});

/** Setting Routers */
app.use(shopRouter);
app.use("/admin", adminRouter);

/** 404(Not Found) Error Handleing */
app.use(ErrorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

Product.sync();
User.sync();

sequelize
  .sync({ alter: true })
  .then((result) => {
    /** sync 성공시 id가 1인 유저를 리턴 */
    return User.findByPk(1);
  })
  .then((user) => {
    /** 만약 유저정보가 없다면 유저 생성 */
    if (!user) {
      return User.create({
        name: "max",
        email: "test@test.com",
      });
    }

    // resolve(user) 반환
    return Promise.resolve(user);
  })
  .then((user) => {
    /** parameter로 return 된 유저를 얻음 */
    app.listen(3000, () => console.log("Port : 3000"));
  })
  .catch((err) => console.error(err));
