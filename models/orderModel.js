import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.ObjectId,
        ref: "Products",
      },
      quantity: Number,
    },
  ],
  buyer: {
    type: mongoose.ObjectId,
    ref: "users",
  },
  paymentId: {}
  ,
  amount: {
    type: Number,
  },

  status: {
    type: String,
    default: "Not Processed",
    enum: ["Not Processed", "Processing", "Shipped", "Delivered", "Canceled"],
  },
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
