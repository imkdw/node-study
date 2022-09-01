import { ObjectId } from "mongodb";
import { getDb } from "../util/database";

class User {
  username: string;
  email: string;
  cart: any;
  id: string;

  constructor(username: string, email: string, cart: any, id: string) {
    this.username = username;
    this.email = email;
    this.cart = cart;
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

  addToCart(product: any) {
    const updatedCart = { items: [{ ...product, quantity: 1 }] };
    const db = getDb();
    return db.collection("users").updateOne({ _id: new ObjectId() }, { $set: { cart: updatedCart } });
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
