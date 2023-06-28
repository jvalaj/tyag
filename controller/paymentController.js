import orderModel from ".././models/orderModel.js"
import Razorpay from "razorpay";
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

    // const { cart } = req.body
    // let total = 0
    // cart.map((i) => {
    //     total += i.price
    //   })

    var options = {
        amount: 500 * 100,  // amount in the smallest currency unit
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
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        req.body;

    try {
        const order = new orderModel({
            products: cart,
            payment: {
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
            },
            buyer: req.user._id,
        }).save();
        res.json({ ok: true });

        res.redirect(
            `/paymentsuccess?reference=${razorpay_order_id}`
        );
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in payment success",
            error
        })
    }



}

