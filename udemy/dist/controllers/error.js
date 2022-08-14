"use strict";
exports.__esModule = true;
var ErrorController = /** @class */ (function () {
    function ErrorController() {
    }
    ErrorController.get404 = function (req, res, next) {
        var contexts = {
            pageTitle: "Page NotFound",
            productCSS: false,
            formsCSS: false,
            path: "/404"
        };
        res.status(404).render("./error/404", contexts);
    };
    return ErrorController;
}());
exports["default"] = ErrorController;
//# sourceMappingURL=error.js.map