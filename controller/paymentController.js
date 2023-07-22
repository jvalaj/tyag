import orderModel from ".././models/orderModel.js"
import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv"
import fs from 'fs';
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
            let mrp = 0;

            cart.map((item) => {
                mrp = mrp + (item.price * item.quantity);
            });
            let taxes = mrp * (0.1)
            let total = mrp + taxes
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

    try {

        const { cart, rpid, uid, amount } = req.fields
        const { photo } = req.files
        if (photo && photo.size > 1000000) {
            return res
                .status(500)
                .send({ error: "photo is Required and should be less then 1mb" });
        }
        const order = new orderModel({

            products: cart.map((p) => (
                { product: p._id, quantity: p.quantity }
            )),
            paymentId: rpid,
            buyer: uid,
            amount: amount,
        })
        console.log("this is the order")
        console.log(order)
        if (photo) {
            order.photo.data = fs.readFileSync(photo.path)
            order.photo.contentType = photo.type;
        }
        await order.save()
        res.status(200).send({
            success: true,
            message: "Order created Succesfully",

        });
    } catch (error) {
        //   } else {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Error in creating order"
        });
    }
    //  }




}

