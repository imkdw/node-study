import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  products: [
    {
      productData: { type: Object, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  user: {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
      ref: "User",
    },
  },
});

export const orderModel = mongoose.model("Order", orderSchema);
