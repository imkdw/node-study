"use strict";
exports.__esModule = true;
exports.isNotLoggedIn = exports.isLoggedIn = void 0;
var isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.status(403).send("로그인 필요");
    }
};
exports.isLoggedIn = isLoggedIn;
var isNotLoggedIn = function (req, res, next) {
    if (!req.isAuthenticated()) {
        next();
    }
    else {
        var message = encodeURIComponent("로그인한 상태");
        res.redirect("/?error=".concat(message));
    }
};
exports.isNotLoggedIn = isNotLoggedIn;
//# sourceMappingURL=middlewares.js.map