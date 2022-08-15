import path from "path";
import fs from "fs";

const p = path.join(__dirname, "..", "..", "src", "data", "cart.json");

class CartModel {
  static addProduct(productId: string, productPrice: string) {
    /** 기존 장바구니 목록 가져오기 */
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        console.error(err);
        return;
      }

      let cart = { products: [], totalPrice: 0 };

      /** 기존 상품이 존재하면 */
      if (fileContent.toString() !== "") {
        cart = JSON.parse(fileContent.toString());
      }

      /** findIndex : 있으면 인덱스, 없으면 -1 반환 */
      const existProductIndex = cart.products.findIndex(
        (p) => p.id === productId
      );

      /** 기존 상품이 있는 경우 qty 값만 증가 */
      if (existProductIndex !== -1) {
        const existProduct = cart.products[existProductIndex];
        const updateProduct = { ...existProduct };
        updateProduct.qty += 1;
        cart.products[existProductIndex] = { ...updateProduct };
      } else {
        /** 기존 상품이 없는경우 새로추가 */
        cart.products.push({
          id: productId,
          qty: 1,
        });
      }

      cart.totalPrice += Number(productPrice);

      fs.writeFile(p, JSON.stringify(cart), (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
    });
  }

  static getCart(callback) {
    /** cart.json을 읽고 모든 카트 목록 반환 */
    fs.readFile(p, (err, fileContent) => {
      const cart = JSON.parse(fileContent.toString());
      if (err) {
        callback(null);
        return;
      } else {
        callback(cart);
      }
    });
  }

  static deleteProduct(id: string, productPrice: string) {
    fs.readFile(p, (err, fileContent) => {
      const cart = JSON.parse(fileContent.toString());
      if (err) {
        console.error(err);
        return;
      }

      const updatedProduct = cart.products.filter((prod) => prod.id !== id);
      const updatedPrice = cart.totalPrice - Number(productPrice);
      const updatedCart = { updatedProduct, updatedPrice };
      console.log(updatedCart);
    });
  }
}

export default CartModel;
