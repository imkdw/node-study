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
// import { ObjectId } from "mongodb";
// import { IProductData } from "../types/product.interface";
// import { getDb } from "../util/database";
// class Product {
//   title: string;
//   price: string;
//   description: string;
//   imageUrl: string;
//   productId: string | null;
//   userId: string;
//   constructor(productData: IProductData) {
//     this.title = productData.title;
//     this.price = productData.price;
//     this.description = productData.description;
//     this.imageUrl = productData.imageUrl;
//     this.productId = productData.productId ? productData.productId : null;
//     this.userId = productData.userId;
//   }
//   save() {
//     const db = getDb();
//     let dbOp;
//     if (this.productId) {
//       dbOp = db.collection("products").updateOne({ _id: new ObjectId(this.productId) }, { $set: this });
//     } else {
//       dbOp = db.collection("products").insertOne(this);
//     }
//     return dbOp.then().catch((err) => console.error(err));
//   }
//   static fetchAll() {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find()
//       .toArray()
//       .then()
//       .catch((err) => {
//         console.error(err);
//       });
//   }
//   static findById(productId: string) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find({ _id: new ObjectId(productId) })
//       .toArray()
//       .then()
//       .catch((err) => console.error(err));
//   }
//   static deleteById(productId: string) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .deleteOne({ _id: new ObjectId(productId) })
//       .then()
//       .catch((err) => console.error(err));
//   }
// }
// export default Product;
//# sourceMappingURL=product.js.map