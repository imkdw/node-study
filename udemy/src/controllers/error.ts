import { NextFunction, Request, Response } from "express";

class ErrorController {
  static get404(req: Request, res: Response, next: NextFunction) {
    const contexts = {
      pageTitle: "Page NotFound",
      productCSS: false,
      formsCSS: false,
      path: "/404",
    };

    res.status(404).render("./error/404", contexts);
  }
}

export default ErrorController;
