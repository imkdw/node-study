import { socketIO } from "./../socket";
import { UserModel } from "./../models/user";
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import path from "path";
import fs from "fs";
import PostModel from "../models/post";

class FeedController {
  static getPosts = async (req: Request, res: Response, next: NextFunction) => {
    const currentPage = Number(req.query.page || 1);
    const perPage = 2;

    try {
      const totalItems = await PostModel.find().countDocuments();
      const posts = await PostModel.find()
        .populate("creator")
        .sort({ createdAt: -1 })
        .skip((currentPage - 1) * perPage)
        .limit(perPage);

      const response = {
        message: "Fetched posts Successfully",
        posts,
        totalItems,
      };

      res.status(200).json(response);
    } catch (err: any) {
      if (!err.statusCode) {
        err.statusCode = 500;
        next(err);
      }
    }

    //  res.status(200).json({ message: "Fetched Posts Successfully", posts, totalItems });
  };

  static getPost = (req: Request, res: Response, next: NextFunction) => {
    const { postId } = req.params;
    PostModel.findById(postId)
      .then((post) => {
        /** Post가 없는 경우 */
        if (!post) {
          const error: any = new Error("Could not find post");
          error.statusCode = 404;
          throw error;
        }

        res.status(200).json({ message: "Post Fetched", post: post });
      })
      .catch((err: any) => {
        if (!err.statusCdoe) {
          err.statusCode = 500;
        }

        next(err);
      });
  };

  static createPost = async (req: Request, res: Response, next: NextFunction) => {
    const { title, content } = req.body;
    const errors = validationResult(req);
    let creator;

    /** 유효성 검증시 오류가 있는 경우 */
    if (!errors.isEmpty()) {
      const error: any = new Error("Validation Failed, entered data is incorrect");
      error.statusCode = 422;
      throw error;
    }

    /** 사진 업로드가 안됬거나 사진이 아닌경우 */
    if (!req.file) {
      const error: any = new Error("No Image Provibed");
      error.statusCode = 422;
    }

    const imageUrl = req.file.path.replace("\\", "/");

    const post = new PostModel({
      title: title,
      imageUrl: imageUrl,
      creator: req.app.get("userId"),
      content: content,
    });

    try {
      await post.save();
      const user = await UserModel.findById(req.app.get("userId"));
      const updatedPosts: any = user.posts;
      updatedPosts.push(post);
      user.posts = updatedPosts;
      await user.save();

      socketIO.getIO().emit("posts", {
        action: "create",
        post: { ...post, creator: { _id: req.app.get("userId"), name: user.name } },
      });

      res.status(201).json({
        message: "Post Created Successfully",
        post: post,
        creator: { _id: user._id, name: user.name },
      });
    } catch (err: any) {
      if (!err.status) {
        err.status = 500;
      }

      throw err;
    }
  };

  static updatePost = async (req: Request, res: Response, next: NextFunction) => {
    const { postId } = req.params;
    const { title, content } = req.body;
    let imageUrl: any = req.body.imageUrl;
    const errors = validationResult(req);

    /** 유효성 검증시 오류가 있는 경우 */
    if (!errors.isEmpty()) {
      const error: any = new Error("Validation Failed, entered data is incorrect");
      error.statusCode = 422;
      throw error;
    }

    /** 새로 업로드된 파일이 있다면 그걸로 사용 */
    if (req.file) {
      imageUrl = req.file.path;
    }

    /** 사진이 없는 경우는 유효성검증 실패 에러 발생 */
    if (!imageUrl) {
      const error: any = new Error("No file picked.");
      error.statusCode = 422;
      throw error;
    }

    try {
      const post: any = await PostModel.findById(postId);

      if (!post) {
        const error: any = new Error("Could not find post");
        error.statusCode = 404;
        throw error;
      }

      // 작성자와 업데이트를 요청한 유저가 다를경우
      if (!post.creator._id.equals(req.app.get("userId"))) {
        const error: any = new Error("Not authorized");
        error.statusCode = 403;
        throw error;
      }

      /** 업로드 사진이 변경될 경우 기존 사진 삭제 */
      if (imageUrl !== post.imageUrl) {
        clearImage(post.imageUrl);
      }

      post.title = title;
      post.imageUrl = imageUrl.replace("\\", "/");
      post.content = content;

      const result = await post.save();
      socketIO.getIO().emit("posts", { action: "update", post: result });
      res.status(200).json({ message: "Post Updated!", post: result });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      throw err;
    }
  };

  static deletePost = async (req: Request, res: Response, next: NextFunction) => {
    const { postId } = req.params; // 원문으로 넘어옴

    try {
      const post: any = await PostModel.findById(postId);
      /** Post를 찾을 수 없을때 */
      if (!post) {
        const error: any = new Error("Could not find post");
        error.statusCode = 404;
        throw error;
      }

      /** Post 작성자와 현재 로그인한 사용자가 다를때 */
      if (post.creator.toString() !== req.app.get("userId")) {
        const error: any = new Error("Not authorized");
        error.statusCdoe = 403;
        throw error;
      }

      await PostModel.findByIdAndDelete(postId);
      clearImage(post.imageUrl);

      const user: any = await UserModel.findById(req.app.get("userId"));
      user.posts.pull(postId);
      await user.save();

      socketIO.getIO().emit("posts", { action: "delete" });
    } catch (err: any) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      throw err;
    }
  };
}

export const clearImage = (filePath: string) => {
  filePath = path.join(__dirname, "..", "..", filePath);
  fs.unlink(filePath, (err) => console.error(err));
};

export default FeedController;
