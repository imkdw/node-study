"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./routes/user"));
const index_1 = __importDefault(require("./routes/index"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
app.set("port", 5000);
app.use((0, morgan_1.default)("dev"));
app.use("/", index_1.default);
app.use("/user", user_1.default);
app.use((req, res, next) => {
    res.status(404).send("Not Found");
});
app.listen(app.get("port"), () => {
    console.log(`Server Running On ${app.get("port")}`);
});
//# sourceMappingURL=app.js.map