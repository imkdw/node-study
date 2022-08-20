import { IProductData } from "../types/product.interface";
import { getDb } from "../util/database";
import { ObjectId } from "mongodb";

class Product {
  title: string;
  price: string;
  description: string;
  imageUrl: string;
  id: null | string;
  userId: string;

  constructor(userDTO: IProductData) {
    this.title = userDTO.title;
    this.price = userDTO.price;
    this.description = userDTO.description;
    this.imageUrl = userDTO.imageUrl;
    this.id = userDTO.productId;
    this.userId = userDTO.userId;
  }

  save() {
    const db = getDb();
    let dbOperation;

    if (this.id) {
      dbOperation = db
        .collection("products")
        .updateOne({ _id: new ObjectId(this.id) }, { $set: this })
        .then()
        .catch((err) => console.error(err));
    } else {
      dbOperation = db
        .collection("products")
        .insertOne(this)
        .then()
        .catch((err) => console.error(err));
    }

    return dbOperation;
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then()
      .catch((err) => console.error(err));
  }

  static findById(productId: string) {
    const db = getDb();

    return db
      .collection("products")
      .findOne({ _id: new ObjectId(productId) })
      .then()
      .catch((err) => console.error(err));
  }

  static deleteById(productId: string) {
    const db = getDb();

    return db
      .collection("products")
      .deleteOne({ _id: new ObjectId(productId) })
      .then()
      .catch((err) => console.error(err));
  }
}

export default Product;
