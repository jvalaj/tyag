import express from 'express'
import { loginController, registerController, testController } from '../controller/authController.js'
import { requireSignIn, isAdmin } from '../middlewares/authMiddleware.js'
//router object

const router = express.Router()

//routing

//Register
router.post('/register', registerController)

//Login
router.post('/login', loginController)

//test routes
router.get("/test", requireSignIn, isAdmin, testController);

//protected route auth
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
})

export default router