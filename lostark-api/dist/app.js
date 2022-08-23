"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var stat_1 = __importDefault(require("./routes/stat"));
var app = (0, express_1["default"])();
app.set("port", 3000);
/** Set Middleware */
app.use((0, morgan_1["default"])("dev"));
app.use(express_1["default"].urlencoded({ extended: true }));
app.use(express_1["default"].json());
/** Set Router */
app.use("/stat", stat_1["default"]);
app.get("/", function (req, res) {
    res.send("noobzz");
});
app.listen(app.get("port"), function () {
    console.log("Server on", app.get("port"));
});
//# sourceMappingURL=app.js.map