"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.requestHandler = void 0;
var fs_1 = __importDefault(require("fs"));
var requestHandler = function (req, res) {
    var url = req.url;
    var method = req.method;
    if (url === "/") {
        res.write("<html>");
        res.write("<head><title>Enter Message!SG</title></head>");
        res.write("<body><form action='/message' method='post'><input type='text' name='message'><button type='submit'>Send</button></form></body>");
        res.write("</html>");
        return res.end();
    }
    if (url === "/message" && method === "POST") {
        var body_1 = [];
        req.on("data", function (chunk) {
            console.log(chunk);
            body_1.push(chunk);
        });
        req.on("end", function () {
            var parsedBody = Buffer.concat(body_1).toString();
            console.log(parsedBody);
            var message = parsedBody.split("=")[0];
            fs_1["default"].writeFile("message.txt", message, function (err) {
                res.statusCode = 302;
                res.setHeader("Location", "/");
                return res.end();
            });
        });
    }
    res.write("<html>");
    res.write("<head><title>Welcome</title></head>");
    res.write("<body><h1>Welcome Node.js Server!!</h1></body>");
    res.write("</html>");
    res.end();
};
exports.requestHandler = requestHandler;
//# sourceMappingURL=routes.js.map