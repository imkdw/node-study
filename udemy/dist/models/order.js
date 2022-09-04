"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.orderModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1["default"].Schema;
var orderSchema = new Schema({
    products: [
        {
            productData: { type: Object, required: true },
            quantity: { type: Number, required: true }
        },
    ],
    user: {
        name: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            required: true,
            ref: "User"
        }
    }
});
exports.orderModel = mongoose_1["default"].model("Order", orderSchema);
//# sourceMappingURL=order.js.map