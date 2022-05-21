"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
var app = (0, express_1["default"])();
app.set("port", process.env.PORT || 5000);
app.use((0, morgan_1["default"])("dev"));
app.get("/", function (req, res) {
    res.send("Welcome");
});
app.listen(app.get("port"), function () {
    console.log("Server is ".concat(app.get("port")));
});
