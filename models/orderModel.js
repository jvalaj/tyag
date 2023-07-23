import mongoose, { STATES } from "mongoose";

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
  photo: {
    data: Buffer,
    contentType: String,

  },
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
