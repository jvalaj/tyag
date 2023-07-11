import categoryModel from "../models/categoryModel.js"
import fs from 'fs'
import slugify from "slugify"
export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.fields
        const { photo } = req.files
        if (!name) {
            return res.status(401).send({ message: "Name is required" })
        }
        const existingCategory = await categoryModel.findOne({ name })
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: "Category Already Exists"
            })
        }
        if (photo && photo.size > 1000000) {
            return res
                .status(500)
                .send({ error: "photo is Required and should be less then 1mb" });
        }
        const category = await new categoryModel({ name, slug: slugify(name) }).save()
        if (photo) {
            category.photo.data = fs.readFileSync(photo.path)
            category.photo.contentType = photo.type;
        }
        await category.save();
        res.status(201).send({
            success: true,
            message: "New Category Created",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error in Category"
        })

    }
}
//get photo
export const categoryPhotoController = async (req, res) => {
    try {
        const category = await categoryModel.findById(req.params.pid).select("photo")
        if (category.photo.data) {
            res.set("Content-type", category.photo.contentType)
            return res.status(200).send(category.photo.data)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in getting product photo",
            error
        })
    }
}


//update category
export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.fields
        const { photo } = req.files
        const category = await categoryModel.findByIdAndUpdate(req.params.id,
            { name, slug: slugify(name) },
            { new: true })

        if (photo) {
            category.photo.data = fs.readFileSync(photo.path);
            category.photo.contentType = photo.type;
        }
        await category.save();
        res.status(200).send({
            success: true,
            message: "Category updated successfully",
            category,

        })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error while updating category in backend"
        })
    }
}

//get all cat
export const categoryController = async (req, res) => {
    try {
        const category = await categoryModel.find({}).select("-photo")
        res.status(200).send({
            success: true,
            message: "All Categories List",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting all categories"
        })
    }
}

//single cat
export const singleCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.paramas.slug }).select("-photo")
        res.status(200).send({
            success: true,
            message: "Get Single Category Successfully",
            category,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting single category"

        })
    }
}

//delete cat
export const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params
        await categoryModel.findByIdAndDelete(id).select("-photo")
        res.status(200).send({
            success: true,
            message: "Category deleted successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while deleting category",
            error
        })
    }
}