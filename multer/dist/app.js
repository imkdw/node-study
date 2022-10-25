"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
// import fileUpload from "express-fileupload";
var multer_1 = __importDefault(require("multer"));
var morgan_1 = __importDefault(require("morgan"));
var uuid_1 = require("uuid");
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1["default"])();
app.set("port", 5000);
var storage = multer_1["default"].diskStorage({
    destination: function (req, file, cb) {
        cb(null, "images");
    },
    filename: function (req, file, cb) {
        cb(null, (0, uuid_1.v4)() + "-" + file.originalname);
    }
});
app.use((0, cors_1["default"])());
app.use(express_1["default"].urlencoded({ extended: true }));
app.use(express_1["default"].json());
app.use((0, morgan_1["default"])("dev"));
app.use((0, multer_1["default"])({ storage: storage }).array("image"));
app.post("/images", function (req, res, next) {
    console.log(req.files);
    res.json("Hello");
});
app.listen(app.get("port"), function () {
    console.log("port:", app.get("port"));
});
