"use strict";
exports.__esModule = true;
exports.sequelize = void 0;
var sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_1.Sequelize("node_complete", "root", "1234", {
    dialect: "mysql",
    host: "localhost",
    logging: false
});
//# sourceMappingURL=database.js.map