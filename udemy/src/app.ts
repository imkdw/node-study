import express from "express";
import bodyParser from "body-parser";
import path from "path";
import mongoose from "mongoose";
import session from "express-session";
import MongoDBStore from "connect-mongodb-session";
import morgan from "morgan";

import adminRouter from "./routes/admin";
import shopRouter from "./routes/shop";
import ErrorController from "./controllers/error";
import { userModel } from "./models/user";
import authRouter from "./routes/auth";

const app = express();
const mongoDbUrl = "mongodb+srv://root:zz11xx22@cluster0.gtcw5zo.mongodb.net/shop?retryWrites=true&w=majority";

/** MongoStore(Save Session) */
const MongoDBStore1 = MongoDBStore(session);
const store = new MongoDBStore1({
  uri: mongoDbUrl,
  collection: "sessions",
});

/** Setting View Engine - EJS */
app.set("view engine", "ejs");

/** Setting Views Directory - Default is /views */
app.set("views", path.join(__dirname, "..", "src", "views"));

/** Setting Middleware */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "..", "src", "public")));
app.use(session({ secret: "i am imkdw", resave: false, saveUninitialized: false, store: store }));
app.use(morgan("dev"));

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

/** Load User by Session */
app.use((req, res, next) => {
  if (!req.session.user) {
    next();
  }

  userModel
    .findById(req.session.user._id)
    .then((user) => {
      res.locals.user = user;
      next();
    })
    .catch((err) => console.error(err));
});

/** Connect Mongoose and Open Server */
mongoose
  .connect(mongoDbUrl)
  .then((result) => {
    app.listen(3000, () => {
      console.log("PORT IS 3000");
    });
  })
  .catch((err) => console.error(err));
