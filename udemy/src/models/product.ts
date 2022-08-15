import path from "path";
import fs from "fs";
import { IProductData } from "../types/product.interface";
import { promisePool as db } from "../util/database";

const p = path.join(__dirname, "..", "..", "src", "data", "products.json");

/** products.json에서 상품목록을 가져오는 함수 */
const getProductsFromFile = (callback) => {
  fs.readFile(p, (err, fileContent) => {
    /** 에러가 발생하거나 기존 데이터가 없는경우 */
    if (err || fileContent.toString() === "") {
      callback([]);
      return;
    }

    callback(JSON.parse(fileContent.toString()));
  });
};

class ProductModel {
  title: string;
  imageUrl: string;
  description: string;
  price: string;
  p: string;
  id: string;

  constructor(product: IProductData) {
    this.title = product.title;
    this.imageUrl = product.imageUrl;
    this.description = product.description;
    this.price = product.price;
    this.id = product.productId;
  }

  save() {
    const query =
      "INSERT INTO products(title, price, imageUrl, description) VALUES (?, ?, ?, ?)";
    return db.execute(query, [
      this.title,
      this.price,
      this.imageUrl,
      this.description,
    ]);
  }

  static fetchAll(callback) {
    getProductsFromFile(callback);
  }

  static databaseFetchAll(): Promise<any> {
    return db.execute("SELECT * FROM products");
  }

  static findById(id: string, callback) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);
      callback(product);
    });
  }

  static dbFindById(id: string): Promise<any> {
    const query = "SELECT * FROM products WHERE id=?";
    return db.execute(query, [id]);
  }

  static deleteById(id: string, callback) {
    getProductsFromFile((products) => {
      const updatedProduct = products.filter((prod) => prod.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProduct), (err) => {
        if (err) {
          console.error(err);
        }
      });
    });
  }
}

export default ProductModel;
