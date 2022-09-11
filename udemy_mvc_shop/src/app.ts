import express, { Request } from "express";
import bodyParser from "body-parser";
import path from "path";
import mongoose from "mongoose";
import session from "express-session";
import MongoDBStore from "connect-mongodb-session";
import morgan from "morgan";
import csurf from "csurf";
import flash from "connect-flash";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

import adminRouter from "./routes/admin";
import shopRouter from "./routes/shop";
import ErrorController from "./controllers/error";
import { userModel } from "./models/user";
import authRouter from "./routes/auth";

const app = express();
// const mongoDbUrl = "mongodb+srv://root:zz11xx22@cluster0.gtcw5zo.mongodb.net/shop?retryWrites=true&w=majority";
const mongoDbUrl = "mongodb://localhost:27017/shop";

/** MongoStore(Save Session) */
const MongoDBStore1 = MongoDBStore(session);
const store = new MongoDBStore1({
  uri: mongoDbUrl,
  collection: "sessions",
});

const csrfProtection = csurf();

const fileStorage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    cb(null, "images");
  },
  filename: (req: Request, file, cb) => {
    cb(null, uuidv4() + "-" + file.originalname);
  },
});

const fileFilter = (req: Request, file, cb) => {
  const mimetype = file.mimetype;
  if (mimetype === "image/png" || mimetype === "image/jpg" || mimetype === "image/jpeg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

/** Setting View Engine - EJS */
app.set("view engine", "ejs");

/** Setting Static Directory */
app.set("views", path.join(__dirname, "..", "src", "views"));
app.use("/images", express.static(path.join(__dirname, "..", "images")));
app.use(express.static(path.join(__dirname, "..", "src", "public")));

/** Setting Middleware */
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({ secret: "i am imkdw", resave: false, saveUninitialized: false, store: store }));
app.use(morgan("dev"));
app.use(csrfProtection);
app.use(flash());
app.use(multer({ storage: fileStorage, fileFilter }).single("image"));

/** Authenticate Middleware */
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

/** Load User by Session */
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }

  userModel
    .findById(req.session.user._id)
    .then((user) => {
      if (!user) {
        return next();
      }

      res.locals.user = user;
      next();
    })
    .catch((err) => {
      next(new Error(err));
    });
});

/** Setting Routers */
app.use(shopRouter);
app.use("/admin", adminRouter);
app.use("/auth", authRouter);
app.get("/500", ErrorController.get500);

/**  Error Handleing */
app.use(ErrorController.get404);

/** Error Handling Middleware */
app.use((error, req, res, next) => {
  console.error(error);
  res.redirect("/500");
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
