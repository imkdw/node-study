"use strict";
exports.__esModule = true;
exports.isAuth = void 0;
function isAuth(req, res, next) {
    if (!req.session.user) {
        return res.redirect("/auth/login");
    }
    next();
}
exports.isAuth = isAuth;
//# sourceMappingURL=is-auth.js.map