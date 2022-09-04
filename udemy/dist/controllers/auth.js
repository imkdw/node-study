"use strict";
exports.__esModule = true;
var AuthController = /** @class */ (function () {
    function AuthController() {
    }
    AuthController.getLogin = function (req, res, next) {
        var isLoggedIn = req.get("Cookie").split("=")[1];
        var contexts = {
            path: "/auth/login",
            pageTitle: "Login",
            isAuthenticated: isLoggedIn
        };
        res.render("auth/login", contexts);
    };
    AuthController.postLogin = function (req, res, next) {
        // * outgoingMessage.setHeader('Set-Cookie', ['foo=bar', 'bar=baz']);
        res.setHeader("Set-Cookie", ["loggedIn=true"]);
        res.redirect("/");
    };
    return AuthController;
}());
exports["default"] = AuthController;
//# sourceMappingURL=auth.js.map