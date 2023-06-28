import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  products: [
    {
      type: mongoose.ObjectId,
      ref: "Product",
    },

  ],
  payment: {
    razorpay_order_id: {
      type: String,
      required: true,
    },
    razorpay_payment_id: {
      type: String,
      required: true,
    },
    razorpay_signature: {
      type: String,
      required: true,
    },
  },
  buyer: {
    type: mongoose.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    default: "Not Processed",
    enum: ["Not Processed", "Processing", "Shipped", "Delivered", "Canceled"],
  },
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
