import express from 'express';
import { forgotPasswordController, getAllOrdersController, getOrdersController, loginController, orderStatusController, prescriptionController, registerController, testController, updateProfileController } from '../controller/authController.js';
import { requireSignIn, isAdmin } from '../middlewares/authMiddleware.js';
import formidable from "express-formidable";
//router object

const router = express.Router()

//routing

//Register
router.post('/register', registerController)

//Login
router.post('/login', loginController)

//forgot password
router.post('/forgot-password', forgotPasswordController)

//test routes
router.get("/test", requireSignIn, isAdmin, testController);

//protected user route auth
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
})
//protected route admin auth
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
})
//update profile
router.put('/profile', requireSignIn, updateProfileController)

//orders
router.get("/orders", requireSignIn, getOrdersController);
//get all orders for admin
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);
//order status update
router.put("/order-status/:orderId", requireSignIn, isAdmin, orderStatusController)

//get prescription
router.get("/prescription/:oid", prescriptionController)

export default router