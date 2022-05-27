import express from "express";
import path from "path";

const PageRouter = express.Router();

PageRouter.use((req, res, next) => {
  res.locals.user = null;
  res.locals.followerCount = 0;
  res.locals.followingCount = 0;
  res.locals.followList = [];
  next();
});

PageRouter.get("/profile", (req, res) => {
  res.render("profile.html", { title: "내 정보 - NodeBird" });
});

PageRouter.get("/join", (req, res) => {
  res.render("join", { title: "회원가입 - NodeBird" });
});

PageRouter.get("/", (req, res, next) => {
  const twits = [];
  res.render("main", {
    title: "NodeBird",
    twits,
  });
});

export default PageRouter;
