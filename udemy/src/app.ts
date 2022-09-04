import express from "express";
import bodyParser from "body-parser";
import path from "path";
import mongoose from "mongoose";

import adminRouter from "./routes/admin";
import shopRouter from "./routes/shop";
import ErrorController from "./controllers/error";
import { userModel } from "./models/user";
import authRouter from "./routes/auth";

const app = express();
const mongoDbUrl = "mongodb+srv://root:zz11xx22@cluster0.gtcw5zo.mongodb.net/shop?retryWrites=true&w=majority";

/** Setting View Engine - EJS */
app.set("view engine", "ejs");

/** Setting Views Directory - Default is /views */
app.set("views", path.join(__dirname, "..", "src", "views"));

/** Setting Middleware */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "..", "src", "public")));

/** Temp Find User Middleware */
app.use((req, res, next) => {
  userModel
    .findById("63145356efa53b689834564c")
    .then((user) => {
      res.locals.user = user;
      // console.log(res.locals.user);
      next();
    })
    .catch((err) => console.error(err));
});

/** Setting Routers */
app.use(shopRouter);
app.use("/admin", adminRouter);
app.use("/auth", authRouter);

/** 404(Not Found) Error Handleing */
app.use(ErrorController.get404);

mongoose.connect(mongoDbUrl).then((result) => {
  userModel
    .findOne()
    .then((user) => {
      if (!user) {
        const user = new userModel({
          name: "Dongwoo",
          email: "imkdw@kakao.com",
          cart: { items: [] },
        });
        user.save();
      }
    })
    .catch((err) => console.error(err));

  app.listen(3000, () => {
    console.log("PORT IS 3000");
  });
});
