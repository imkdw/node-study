import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    cart: {
      items: [
        {
          productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
        },
      ],
    },
  },
  {
    methods: {
      addToCart(product: any) {
        const cartProductIndex = this.cart.items.findIndex((cp) => {
          if (cp.productId.equals(product._id)) {
            return cp;
          }
        });

        /** 기존 카트에 존재하는 아이템 이라면 */
        if (cartProductIndex !== -1) {
          const existCart = this.cart.items[cartProductIndex];
          existCart.quantity += 1;
          this.cart.items[cartProductIndex] = existCart;
        } else {
          /** 기존 카트에 존재하지 않는 아이템 이라면 */
          const newCart = { productId: product._id, quantity: 1 };
          this.cart.items.push(newCart);
        }

        return this.save();
      },
      removeFromCart(productId: string) {
        const updatedCartItems = this.cart.items.filter((item) => {
          if (item.productId.toString() !== productId.toString()) {
            return item;
          }
        });

        this.cart.items = updatedCartItems;
        return this.save();
      },
    },
  }
);

export const userModel = mongoose.model("User", userSchema);
