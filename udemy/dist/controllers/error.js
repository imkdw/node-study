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
    ErrorController.get500 = function (req, res, next) {
        var contexts = {
            pageTitle: "Server Error",
            productCSS: false,
            formsCSS: false,
            path: "/500"
        };
        res.status(500).render("./error/500", contexts);
    };
    return ErrorController;
}());
exports["default"] = ErrorController;
//# sourceMappingURL=error.js.map