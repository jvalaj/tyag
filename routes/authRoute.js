import express from 'express'
import { forgotPasswordController, loginController, registerController, testController } from '../controller/authController.js'
import { requireSignIn, isAdmin } from '../middlewares/authMiddleware.js'
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

export default router