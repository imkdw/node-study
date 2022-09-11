import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import PostModel from "../models/post";

class FeedController {
  static getPosts = (req: Request, res: Response, next: NextFunction) => {
    PostModel.find()
      .then((posts) => {
        if (!posts) {
          const error: any = new Error("Cloud not find Posts");
          error.statusCode = 404;
          throw error;
        }

        res.status(200).json({ message: "Fetched Posts Successfully", posts });
      })
      .catch((err: any) => {
        if (!err.statusCdoe) {
          err.statusCode = 500;
        }

        next(err);
      });
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

  static createPost = (req: Request, res: Response, next: NextFunction) => {
    const { title, content } = req.body;
    const errors = validationResult(req);

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
      creator: { name: "Dongwoo" },
      content: content,
    });

    post
      .save()
      .then((result) => {
        console.log(result);

        return res.status(201).json({
          message: "Post created Successfully",
          post: result,
        });
      })
      .catch((err: any) => {
        if (!err.statusCdoe) {
          err.statusCode = 500;
        }

        next(err);
      });
  };

  static editPost = (req: Request, res: Response, next: NextFunction) => {
    const { postId } = req.params;
  };
}

export default FeedController;
