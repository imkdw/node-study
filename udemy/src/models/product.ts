import path from "path";
import fs from "fs";
import { IProductData } from "../types/product.interface";

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
    getProductsFromFile((products) => {
      if (this.id) {
        /** 기존 상품 업데이트 */
        const existProductIndex = products.findIndex(
          (prod) => prod.id === this.id
        );
        const updateProduct = [...products];
        updateProduct[existProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updateProduct), {}, (err) => {
          if (err) {
            console.error(err);
          }
        });
      } else {
        /** 신규 상품 추가 */
        const productData = {
          id: Math.random().toString(),
          title: this.title,
          imageUrl: this.imageUrl,
          price: this.price,
          description: this.description,
        };

        products.push(productData);

        fs.writeFile(p, JSON.stringify(products), {}, (err) => {
          if (err) {
            console.error(err);
          }
        });
      }
    });
  }

  static fetchAll(callback) {
    getProductsFromFile(callback);
  }

  static findById(id: string, callback) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);
      callback(product);
    });
  }

  static deleteById(id: string, callback) {
    getProductsFromFile((products) => {
      const updatedProduct = products.filter((prod) => prod.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProduct), (err) => {
        if (err) {
          console.error(err);
        }

        callback();
      });
    });
  }
}

export default ProductModel;
