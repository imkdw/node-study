import { ObjectId } from "mongodb";
import { getDb } from "../util/database";

class User {
  username: string;
  email: string;
  // cart: any;
  id: string;

  constructor(username: string, email: string, id: string) {
    this.username = username;
    this.email = email;
    // this.cart = cart;
    this.id = id;
  }

  save() {
    const db = getDb();
    return db
      .collection("users")
      .insertOne(this)
      .then()
      .catch((err) => console.error(err));
  }

  static getCart(userId: string) {
    const db = getDb();

    return db
      .collection("users")
      .find({ _id: new ObjectId(userId) })
      .toArray()
      .then()
      .catch((err) => console.error(err));
  }

  async addToCart(product: any) {
    const db = getDb();
    const userData = await User.findById(this.id);
    let updatedCart;
    const newQuantity = 1;

    /**
     * 1. 기존에 카트에 상품들이 존재하는지 체크
     * 2-1. 상품이 있을경우 기존 추가된 상품이 있는지 확인하여 수량만 1개 추가
     * 2-2. 상품이 없을경우 새로운 상품을 추가
     */
    if (userData[0].cart) {
      const cartProductIndex = userData[0].cart.items.findIndex((cp) => cp.productId.toString() === new ObjectId(product._id).toString());
      const updatedCartItems = userData[0].cart.items;

      /** 2-1. 기존에 존재하는 상품일 경우 */
      if (cartProductIndex !== -1) {
        const existCart = updatedCartItems[cartProductIndex];
        existCart.quantity += 1;
        updatedCartItems[cartProductIndex] = existCart;
        updatedCart = { items: updatedCartItems };
      } else {
        /** 2-2. 기존에 존재하지 않는 상품일 경우 */
        const newCart = { productId: new ObjectId(product._id), quantity: newQuantity };
        updatedCartItems.push(newCart);
        updatedCart = { items: updatedCartItems };
      }
    } else {
      /** 기존 카트에 상품들이 없는 상태로 새로운 제품을 추가함 */
      updatedCart = { items: [{ productId: new ObjectId(product._id), quantity: newQuantity }] };
    }

    return db.collection("users").updateOne({ _id: new ObjectId(this.id) }, { $set: { cart: updatedCart } });
  }

  static findById(userId: string) {
    const db = getDb();
    return db
      .collection("users")
      .find({ _id: new ObjectId(userId) })
      .toArray()
      .then()
      .catch((err) => console.error(err));
  }
}

export default User;
