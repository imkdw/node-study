"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var routes_1 = __importDefault(require("./routes"));
var auth_1 = __importDefault(require("./routes/auth"));
var path_1 = __importDefault(require("path"));
var nunjucks_1 = __importDefault(require("nunjucks"));
var morgan_1 = __importDefault(require("morgan"));
var db_1 = require("./db");
var app = (0, express_1["default"])();
app.set("port", 3000);
app.set("view engine", "html");
nunjucks_1["default"].configure({
    express: app,
    watch: true
});
db_1.db.connect();
app.use(express_1["default"].static(path_1["default"].join(__dirname, "../views")));
app.use((0, morgan_1["default"])("dev"));
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: true }));
app.use("/", routes_1["default"]);
app.use("/", auth_1["default"]);
app.listen(app.get("port"), function () {
    console.log("Server on ".concat(app.get("port")));
});
//# sourceMappingURL=app.js.map