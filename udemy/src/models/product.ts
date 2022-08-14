import path from 'path';
import fs from 'fs';

const products = [];
const p = path.join(__dirname, '..', '..', 'src', 'data', 'products.json');

/** products.json에서 상품목록을 가져오는 함수 */
const getProductsFromFile = (callback) => {
  fs.readFile(p, (err, fileContent) => {
    /** 에러가 발생하거나 기존 데이터가 없는경우 */
    if (err || fileContent.toString() === '') {
      callback([]);
      return;
    }

    callback(JSON.parse(fileContent.toString()));
  });
};

interface IProductParams {
  title: string;
  imageUrl: string;
  description: string;
  price: string;
}

class ProductModel {
  title: string;
  imageUrl: string;
  description: string;
  price: string;
  p: string;

  constructor(product: IProductParams) {
    this.title = product.title;
    this.imageUrl = product.imageUrl;
    this.description = product.description;
    this.price = product.price;
  }

  save() {
    getProductsFromFile((products) => {
      const productData = {
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
    });
  }

  static fetchAll(callback) {
    getProductsFromFile(callback);
  }
}

export default ProductModel;
