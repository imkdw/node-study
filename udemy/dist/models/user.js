"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var mongodb_1 = require("mongodb");
var database_1 = require("../util/database");
var User = /** @class */ (function () {
    function User(username, email, id) {
        this.username = username;
        this.email = email;
        // this.cart = cart;
        this.id = id;
    }
    User.prototype.save = function () {
        var db = (0, database_1.getDb)();
        return db
            .collection("users")
            .insertOne(this)
            .then()["catch"](function (err) { return console.error(err); });
    };
    User.prototype.addToCart = function (product) {
        return __awaiter(this, void 0, void 0, function () {
            var db, userData, updatedCart, newQuantity, cartProductIndex, updatedCartItems, existCart, newCart;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = (0, database_1.getDb)();
                        return [4 /*yield*/, User.findById(this.id)];
                    case 1:
                        userData = _a.sent();
                        newQuantity = 1;
                        /**
                         * 1. 기존에 카트에 상품들이 존재하는지 체크
                         * 2-1. 상품이 있을경우 기존 추가된 상품이 있는지 확인하여 수량만 1개 추가
                         * 2-2. 상품이 없을경우 새로운 상품을 추가
                         */
                        if (userData[0].cart) {
                            cartProductIndex = userData[0].cart.items.findIndex(function (cp) { return cp.productId.toString() === new mongodb_1.ObjectId(product._id).toString(); });
                            updatedCartItems = userData[0].cart.items;
                            /** 2-1. 기존에 존재하는 상품일 경우 */
                            if (cartProductIndex !== -1) {
                                existCart = updatedCartItems[cartProductIndex];
                                existCart.quantity += 1;
                                updatedCartItems[cartProductIndex] = existCart;
                                updatedCart = { items: updatedCartItems };
                            }
                            else {
                                newCart = { productId: new mongodb_1.ObjectId(product._id), quantity: newQuantity };
                                updatedCartItems.push(newCart);
                                updatedCart = { items: updatedCartItems };
                            }
                        }
                        else {
                            /** 기존 카트에 상품들이 없는 상태로 새로운 제품을 추가함 */
                            updatedCart = { items: [{ productId: new mongodb_1.ObjectId(product._id), quantity: newQuantity }] };
                        }
                        return [2 /*return*/, db.collection("users").updateOne({ _id: new mongodb_1.ObjectId(this.id) }, { $set: { cart: updatedCart } })];
                }
            });
        });
    };
    User.findById = function (userId) {
        var db = (0, database_1.getDb)();
        return db
            .collection("users")
            .find({ _id: new mongodb_1.ObjectId(userId) })
            .toArray()
            .then()["catch"](function (err) { return console.error(err); });
    };
    return User;
}());
exports["default"] = User;
//# sourceMappingURL=user.js.map