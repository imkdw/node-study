import { ObjectId } from "mongodb";
import { getDb } from "../util/database";

class User {
  username: string;
  email: string;

  constructor(username, email) {
    this.username = username;
    this.email = email;
  }

  save() {
    const db = getDb();
    return db
      .collection("users")
      .insertOne(this)
      .then()
      .catch((err) => console.error(err));
  }

  addToCart() {}

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
