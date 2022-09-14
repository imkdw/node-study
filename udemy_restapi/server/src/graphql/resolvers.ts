import { compare, hash } from "bcrypt";
import validator from "validator";
import { sign } from "jsonwebtoken";

import { UserModel } from "../models/user";
import PostModel from "../models/post";
import { Request } from "express";

export class GraphqlResolver {
  static createUser = async ({ userInput }) => {
    const { email, password, name } = userInput;
    console.log(email, password, name);

    const errors = [];

    /** 이메일 형식에 맞지 않는경우 */
    if (!validator.isEmail(email)) {
      errors.push({ message: "E-Mail is invalid" });
    }

    /** 공백이거나 길이가 5글자 미만인 경우 */
    if (validator.isEmpty(password) || !validator.isLength(password, { min: 5 })) {
      errors.push({ message: "Password to short" });
    }

    /** errors 배열에 값이 하나라도 있으면 유효성검증 실패 */
    if (errors.length > 0) {
      const error: any = new Error();
      error.data = errors;
      error.code = 422;
      throw error;
    }

    const existingUser = await UserModel.findOne({ email: email });

    if (existingUser) {
      const error = new Error("User exists already");
      throw error;
    }

    const hashedPassword = await hash(password, 12);
    const user = new UserModel({
      email,
      password: hashedPassword,
      name,
      status: "Good",
    });

    const createdUser: any = await user.save();

    return {
      ...createdUser._doc,
      _id: createdUser._id.toString(),
    };
  };

  static login = async ({ email, password }) => {
    const user: any = await UserModel.findOne({ email });
    if (!user) {
      const error: any = new Error("User not found");
      error.code = 404;
      throw error;
    }

    const isEqual = await compare(password, user.password);
    if (!isEqual) {
      const error: any = new Error("Password is Incorrect");
      error.code = 401;
      throw error;
    }

    const token = sign(
      {
        userId: user._id.toString(),
        email: user.email,
      },
      "thisismyjwtsecretkey",
      { expiresIn: "1h" }
    );

    return { token, userId: user._id.toString() };
  };

  static createPost = async ({ postInput }, req: Request) => {
    if (!req.app.get("isAuth")) {
      const error: any = new Error();
      error.code = 401;
      throw 401;
    }
    const errors = [];

    if (validator.isEmpty(postInput.title) || !validator.isLength(postInput.title, { min: 5 })) {
      errors.push({ messagE: "postInput.Title is invalid" });
    }

    if (validator.isEmpty(postInput.content) || !validator.isLength(postInput.content, { min: 5 })) {
      errors.push({ messagE: "Content is invalid" });
    }

    if (errors.length > 0) {
      const error: any = new Error();
      error.data = errors;
      error.code = 422;
      throw error;
    }

    try {
      const user = await UserModel.findById(req.app.get("userId"));
      if (!user) {
        const error: any = new Error();
        error.code = 401;
        throw error;
      }

      /** 포스트 생성 */
      const post = new PostModel({
        title: postInput.title,
        content: postInput.content,
        imageUrl: postInput.imageUrl,
        creator: user,
      });

      const createdPost: any = await post.save();
      user.posts.push(createdPost);
      await user.save();

      /** 유저 데이터에 포스터 추가 */

      return {
        ...createdPost._doc,
        _id: createdPost._id,
        createdAt: createdPost.createdAt.toISOString(),
        updatedAt: createdPost.updatedAt.toISOString(),
      };
    } catch (err) {
      console.error(err);
    }
  };

  static posts = async ({ page }, req: Request) => {
    if (!req.app.get("isAuth")) {
      const error: any = new Error();
      error.code = 401;
      throw 401;
    }

    if (!page) {
      page = 1;
    }

    const perPage = 2;
    const totalPosts = PostModel.find().countDocuments();
    const posts: any = await PostModel.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * perPage)
      .limit(perPage)
      .populate("creator");
    const resPosts = posts.map((post) => {
      return {
        ...post._doc,
        _id: post._id.toString(),
        createdAt: post.createdAt.toISOString(),
        updatedAt: post.updatedAt.toISOString(),
      };
    });

    return {
      posts: resPosts,
      totalPosts,
    };
  };

  static post = async ({ id }, req) => {
    // if (!req.app.get("isAuth")) {
    //   const error: any = new Error();
    //   error.code = 401;
    //   throw 401;
    // }

    const post: any = await PostModel.findById(id).populate("creator");
    console.log(post);

    if (!post) {
      const error: any = new Error("No Post Found");
      error.code = 404;
      throw error;
    }

    return {
      ...post._doc,
      _id: post._id.toString(),
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    };
  };
}
