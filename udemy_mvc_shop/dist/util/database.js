"use strict";
exports.__esModule = true;
exports.getDb = exports.mongoConnect = void 0;
var mongodb_1 = require("mongodb");
var _db;
var mongoConnect = function (callback) {
    var uri = "mongodb+srv://root:zz11xx22@cluster0.gtcw5zo.mongodb.net/shop?retryWrites=true&w=majority";
    var client = new mongodb_1.MongoClient(uri, { serverApi: mongodb_1.ServerApiVersion.v1 });
    client
        .connect()
        .then(function (client) {
        _db = client.db();
        callback(client);
    })["catch"](function (err) { return console.error(err); });
};
exports.mongoConnect = mongoConnect;
var getDb = function () {
    if (_db) {
        return _db;
    }
    throw "Cannot Found Database";
};
exports.getDb = getDb;
//# sourceMappingURL=database.js.map