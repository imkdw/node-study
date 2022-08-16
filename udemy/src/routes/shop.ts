import express from "express";
import ShopController from "../controllers/shop";

const shopRouter = express.Router();

/**
 * * METHOD: GET /
 * DESC: 메인페이지, 모든 상품 목록을 표시
 */
shopRouter.get("/", ShopController.getIndex);

/**
 * * METHOD: GET /products
 * DESC: 상품 목록 표시
 */
shopRouter.get("/products", ShopController.getProducts);

// /**
//  * * METHOD: GET /cart
//  * DESC: 장바구니 목록 가져오기
//  */
// shopRouter.get("/cart", ShopController.getCart);

// /**
//  * * METHOD: POST /cart
//  * DESC: 장바구니에 상품 추가
//  */
// shopRouter.post("/cart", ShopController.postCart);

// shopRouter.post("/cart-delete-item", ShopController.postCartDeleteItem);

// /**
//  * * METHOD: GET /checkout
//  * DESC: 계산 페이지 가져오기
//  */
// shopRouter.get("/checkout", ShopController.getCheckOut);

// /**
//  * * METHOD: GET /orders
//  * DESC: 주문목록 가져오기
//  */
// shopRouter.get("/orders", ShopController.getOrders);

/**
 * * METHOD: GET /products/:productId
 * DESC: 특정 상품의 디테일 정보 표시
 */
shopRouter.get("/products/:productId", ShopController.getProduct);

export default shopRouter;
