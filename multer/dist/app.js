"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var multer_1 = __importDefault(require("multer"));
var app = (0, express_1["default"])();
app.set("port", 5000);
var storage = multer_1["default"].diskStorage({
    destination: function (req, file, cb) {
        cb(null, "images");
    }
});
app.use(express_1["default"].urlencoded({ extended: true }));
app.use(express_1["default"].json());
app.use((0, multer_1["default"])({ storage: storage }).single("image"));
app.post("/images", function (req, res, next) {
    console.log(req.file);
});
app.listen(app.get("port"), function () {
    console.log("port:", app.get("port"));
});
