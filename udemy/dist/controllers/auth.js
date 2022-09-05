"use strict";
exports.__esModule = true;
var AuthController = /** @class */ (function () {
    function AuthController() {
    }
    AuthController.getLogin = function (req, res, next) {
        console.log(req.session.isLoggedIn);
        var contexts = {
            path: "/auth/login",
            pageTitle: "Login",
            isAuthenticated: false
        };
        res.render("auth/login", contexts);
    };
    AuthController.postLogin = function (req, res, next) {
        req.session.isLoggedIn = true;
        res.redirect("/");
    };
    AuthController.postLogout = function (req, res, next) {
        req.session.destroy(function (err) {
            console.log(err);
            res.redirect("/");
        });
    };
    return AuthController;
}());
exports["default"] = AuthController;
//# sourceMappingURL=auth.js.map