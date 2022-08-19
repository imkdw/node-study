"use strict";
exports.__esModule = true;
exports.mongoConnect = void 0;
var mongodb_1 = require("mongodb");
var mongoConnect = function (callback) {
    var uri = "mongodb+srv://root:1234@cluster0.gtcw5zo.mongodb.net/?retryWrites=true&w=majority";
    var client = new mongodb_1.MongoClient(uri, { serverApi: mongodb_1.ServerApiVersion.v1 });
    client
        .connect()
        .then(function (result) {
        console.log(result);
        callback(result);
    })["catch"](function (err) { return console.error(err); });
};
exports.mongoConnect = mongoConnect;
//# sourceMappingURL=database.js.map