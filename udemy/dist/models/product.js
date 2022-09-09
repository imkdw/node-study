"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.ProductModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
/** Create New Schema */
var Schema = mongoose_1["default"].Schema;
var productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});
exports.ProductModel = mongoose_1["default"].model("Product", productSchema);
//# sourceMappingURL=product.js.map