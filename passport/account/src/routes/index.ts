import exporess from "express";

const indexRouter = exporess.Router();

indexRouter.get("/", (req, res) => {
  res.render("index");
});

export default indexRouter;
