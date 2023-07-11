import express from 'express'
import formidable from "express-formidable"
import { isAdmin, requireSignIn } from './../middlewares/authMiddleware.js'
import { categoryController, categoryPhotoController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from '../controller/categoryController.js'
const router = express.Router()

//routes
router.post('/create-category',
    requireSignIn,
    isAdmin, formidable(),
    createCategoryController)


//update category
router.put('/update-category/:id',
    requireSignIn,
    isAdmin, formidable(),
    updateCategoryController)

//getall category
router.get("/get-category", categoryController)

//get photo
router.get('/category-photo/:pid', categoryPhotoController)

//single category
router.get("/single-category/:slug", singleCategoryController)


//delete category
router.delete("/delete-category/:id", requireSignIn, isAdmin, deleteCategoryController)

export default router