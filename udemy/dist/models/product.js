"use strict";
exports.__esModule = true;
exports.Product = void 0;
var sequelize_1 = require("sequelize");
var database_1 = require("../util/database");
exports.Product = database_1.sequelize.define("product", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false
    },
    imageUrl: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    }
});
//# sourceMappingURL=product.js.map