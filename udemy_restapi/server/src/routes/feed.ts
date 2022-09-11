import express from "express";
import FeedController from "../controllers/feed";
import { body } from "express-validator";

const feedRouter = express.Router();

feedRouter.get("/posts", FeedController.getPosts);

feedRouter.post(
  "/post",
  [body("title").trim().isLength({ min: 5 }), body("content").trim().isLength({ min: 5 })],
  FeedController.createPost
);

feedRouter.get("/post/:postId", FeedController.getPost);
feedRouter.put("/post/:postId", FeedController.editPost);

export default feedRouter;
