import { isAuth } from "./../middleware/is-auth";
import express from "express";
import FeedController from "../controllers/feed";
import { body } from "express-validator";

const feedRouter = express.Router();

feedRouter.get("/posts", isAuth, FeedController.getPosts);

feedRouter.post(
  "/post",
  [body("title").trim().isLength({ min: 5 }), body("content").trim().isLength({ min: 5 })],
  isAuth,
  FeedController.createPost
);

feedRouter.get("/post/:postId", isAuth, FeedController.getPost);
feedRouter.put("/post/:postId", isAuth, FeedController.updatePost);
feedRouter.delete("/post/:postId", isAuth, FeedController.deletePost);

export default feedRouter;
