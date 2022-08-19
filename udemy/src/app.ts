import express from "express";
import bodyParser from "body-parser";
import path from "path";

import adminRouter from "./routes/admin";
import shopRouter from "./routes/shop";
import ErrorController from "./controllers/error";
import { mongoConnect } from "./util/database";

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

/** 404(Not Found) Error Handleing */
app.use(ErrorController.get404);

mongoConnect((client) => {
  console.log(client);
  app.listen(3000, () => console.log("Port : 3000"));
});
