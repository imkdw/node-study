import { getDb } from "../util/database";
import { MongoError, ObjectId } from "mongodb";

class User {
  userName: string;
  email: string;

  constructor(userName: string, email: string) {
    this.userName = userName;
    this.email = email;
  }

  save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }

  static findById(userId: string) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) })
      .then()
      .catch((err: MongoError) => console.error(err));
  }
}

export default User;
