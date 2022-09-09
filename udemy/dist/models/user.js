"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.userModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1["default"].Schema;
var userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    resetToken: {
        type: String
    },
    resetTokenExpiration: {
        type: Date
    },
    cart: {
        items: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                }
            },
        ]
    }
}, {
    methods: {
        addToCart: function (product) {
            var cartProductIndex = this.cart.items.findIndex(function (cp) {
                if (cp.productId.equals(product._id)) {
                    return cp;
                }
            });
            /** 기존 카트에 존재하는 아이템 이라면 */
            if (cartProductIndex !== -1) {
                var existCart = this.cart.items[cartProductIndex];
                existCart.quantity += 1;
                this.cart.items[cartProductIndex] = existCart;
            }
            else {
                /** 기존 카트에 존재하지 않는 아이템 이라면 */
                var newCart = { productId: product._id, quantity: 1 };
                this.cart.items.push(newCart);
            }
            return this.save();
        },
        removeFromCart: function (productId) {
            var updatedCartItems = this.cart.items.filter(function (item) {
                if (item.productId.toString() !== productId.toString()) {
                    return item;
                }
            });
            this.cart.items = updatedCartItems;
            return this.save();
        }
    }
});
exports.userModel = mongoose_1["default"].model("User", userSchema);
//# sourceMappingURL=user.js.map