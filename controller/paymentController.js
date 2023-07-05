import orderModel from ".././models/orderModel.js"
import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv"
dotenv.config()
//payment gateway
var instance = new Razorpay({
    key_id: process.env.RAZORPAY_ID_KEY,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
});


//payment gateway api

//create order
export const razorpayOrderController = async (req, res) => {

    //total price
    const totalPrice = () => {
        try {
            const cart = req.body
            let total = 0;
            cart.map((item) => {
                total = total + (item.price * item.quantity);
            });
            return total
        } catch (error) {
            console.log(error);
        }
    };


    var options = {
        amount: totalPrice() * 100,  // amount in the smallest currency unit
        currency: "INR",
    };

    try {
        instance.orders.create(options, function (err, order) {
            if (err) {
                res.status(500).send(err)
            } else {
                console.log(order)
                res.status(200).send(order)
            }
        });
    } catch (error) {
        console.log(error)
    }
}
//verify payment
export const razorpayPaymentVerificationController = async (req, res) => {


    ;

    //  const body = razorpay_order_id + "|" + razorpay_payment_id;

    //  const expectedSignature = crypto
    //      .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
    //      .update(body.toString())
    //     .digest("hex");

    //  const isAuthentic = expectedSignature === razorpay_signature;

    //  if (isAuthentic) {
    // Order in Database creation
    try {
        const { cart } = req.body
        const { rpid } = req.body
        const { uid } = req.body
        const { amount } = req.body
        const order = new orderModel({
            products: cart,
            paymentId: rpid,
            buyer: uid,
            amount: amount
        })
        console.log(order)
        order.save()
        res.status(200).send({
            success: true,
            message: "Order created Succesfully in backend",

        });
    } catch (error) {
        //   } else {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Error in creating order in backend"
        });
    }
    //  }




}

