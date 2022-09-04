import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
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
        /** 기존에 존재하는 카트 아이템의 인덱스 */
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
          if (item.productId.equals(productId)) {
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

// class User {
//   username: string;
//   email: string;
//   // cart: any;
//   id: string;

//   constructor(username: string, email: string, id: string) {
//     this.username = username;
//     this.email = email;
//     // this.cart = cart;
//     this.id = id;
//   }

//   save() {
//     const db = getDb();
//     return db
//       .collection("users")
//       .insertOne(this)
//       .then()
//       .catch((err) => console.error(err));
//   }

//   static getCart(userId: string) {
//     const db = getDb();

//     return db
//       .collection("users")
//       .find({ _id: new ObjectId(userId) })
//       .toArray()
//       .then()
//       .catch((err) => console.error(err));
//   }

//   async addToCart(product: any) {
//     const db = getDb();
//     const userData = await User.findById(this.id);
//
//   }

//   async deleteItemFromCart(productId: string) {
//     const db = getDb();
//     const userData = await User.findById(this.id);
//     const cartItems = userData[0].cart.items;
//     const updatedCartItems = cartItems.filter((cartItem) => cartItem.productId.toString() !== productId);
//     const updatedCart = { items: updatedCartItems };

//     return db
//       .collection("users")
//       .updateOne({ _id: new ObjectId(this.id) }, { $set: { cart: updatedCart } })
//       .then()
//       .catch((err) => console.error(err));
//   }

//   static findById(userId: string) {
//     const db = getDb();
//     return db
//       .collection("users")
//       .find({ _id: new ObjectId(userId) })
//       .toArray()
//       .then()
//       .catch((err) => console.error(err));
//   }
// }

// export default User;
