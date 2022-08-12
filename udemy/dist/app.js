"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var app = (0, express_1["default"])();
app.use(body_parser_1["default"].urlencoded({ extended: false }));
app.use("/app-product", function (req, res, next) {
    res.send("<form action=\"/product\" method=\"POST\"><input type=\"text\" name=\"title\"><button type=\"submit\">Add Product</button></form>");
});
app.post("/product", function (req, res, next) {
    console.log(JSON.parse(JSON.stringify(req.body)));
    res.redirect("/");
});
app.use("/", function (req, res, next) {
    res.send("<h1>Hello Express!</h1><br><a href='/app-product'>app-product</a>");
});
app.listen(3000);
//# sourceMappingURL=app.js.map