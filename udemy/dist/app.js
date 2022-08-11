"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var http_1 = __importDefault(require("http"));
var express_1 = __importDefault(require("express"));
var app = (0, express_1["default"])();
var server = http_1["default"].createServer(app);
server.listen(3000);
//# sourceMappingURL=app.js.map