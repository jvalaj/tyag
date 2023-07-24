import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";
import { razorpayOrderController, razorpayPaymentVerificationController, updatePhotoController } from "../controller/paymentController.js";
//payment routes
const router = express.Router()

//create order in server
router.post("/razorpay/order", requireSignIn, razorpayOrderController)

//order verification
router.post("/razorpay/verify", razorpayPaymentVerificationController, requireSignIn, formidable())

//add prescription
router.put("/razorpay/pres/:id", formidable(), updatePhotoController)


export default router