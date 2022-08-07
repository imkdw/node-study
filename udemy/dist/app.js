"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var http_1 = __importDefault(require("http"));
var routes_1 = require("./routes");
var server = http_1["default"].createServer(routes_1.requestHandler);
server.listen(3000);
//# sourceMappingURL=app.js.map