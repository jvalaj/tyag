import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({


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
  status: {
    type: String,
    default: "Not Processed",
    enum: ["Not Processed", "Processing", "Shipped", "Delivered", "Canceled"],
  },
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
