import express from "express";
import bodyParser from "body-parser";
import path from "path";
import ExpressHandlebars from "express-handlebars";

import adminRouter from "./routes/admin";
import shopRouter from "./routes/shop";

const app = express();

/** Setting View Engine - PUG */
// app.set("view engine", "pug");

/** Setting View Engine - Handlebars */
// app.engine(
//   "hbs",
//   ExpressHandlebars({
//     layoutsDir: path.join(__dirname, "..", "src", "views", "layouts"),
//     defaultLayout: "main-layout",
//     extname: "hbs",
//   })
// );
// app.set("view engine", "hbs");

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

/** 404(Not Found) Error Handleing */
app.use((req, res, next) => {
  const contexts = {
    pageTitle: "Page NotFound",
  };

  res.status(404).render("404", contexts);
});

app.listen(3000);
