import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import { razorpayOrderController, razorpayPaymentVerificationController } from "../controller/paymentController.js";
//payment routes
const router = express.Router()

//create order in server
router.post("/razorpay/order", requireSignIn, razorpayOrderController)

//order verification
router.post("/razorpay/verify", razorpayPaymentVerificationController)

export default router