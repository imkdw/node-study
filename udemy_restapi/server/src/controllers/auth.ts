import { UserModel } from "./../models/user";
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthController {
  static signup = (req: Request, res: Response, next: NextFunction) => {
    const { email, name, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error: any = new Error("Validation failed.");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    bcrypt
      .hash(password, 12)
      .then((hashedPassword) => {
        const user = new UserModel({ email, password: hashedPassword, name, status: "Newbie" });

        return user.save();
      })
      .then((result) => {
        res.status(200).json({ message: "User Created!", userId: result._id });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }

        throw err;
      });
  };

  static login = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    let loadedUser;

    console.log("email: ", email);
    UserModel.findOne({ email })
      .then((user: any) => {
        if (!user) {
          const error: any = new Error("A user with this email cannot found");
          error.statusCode = 404;
          throw error;
        }

        loadedUser = user;
        bcrypt
          .compare(password, user.password)
          .then((isEqual) => {
            if (!isEqual) {
              const error: any = new Error("Wrong Password");
              error.statusCode = 401;
              throw error;
            }

            const token = jwt.sign(
              {
                email: loadedUser.email,
                userId: loadedUser._id.toString(),
              },
              "thisismyjwtsecretkey",
              { expiresIn: "1h" }
            );

            res.status(200).json({ token, userId: loadedUser._id.toString() });
          })
          .catch((err) => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }

            throw err;
          });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }

        throw err;
      });
  };
}
