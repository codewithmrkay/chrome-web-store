import { Category } from "../models/category.model.js"
import { Shortcut } from "../models/shortcut.model.js"

export const createCateGory = async (req, res) => {
    const { name } = req.body
    const userId = req.user._id

    try {
        if (!name.trim()) {
            return res.status(400).json({ message: "Category name is required" })
        }

        const existing = await Category.findOne({
            name: name.toLowerCase(),
            user: userId
        })

        if (existing) {
            return res.status(409).json({
                message: "Category already exists"
            })
        }

        const category = await Category.create({
            name,
            user: userId
        })

        res.status(201).json({
            message: "Category created successfully",
            category
        })
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: "Duplicate category"
            })
        }

        console.error("CreateCategory error:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const deleteCateGory = async (req, res) => {
    const { id } = req.params
    const userId = req.user._id

    try {
        const category = await Category.findOne({ _id: id, user: userId })
        if (!category) {
            return res.status(404).json({ message: "Category not found" })
        }

        await Shortcut.deleteMany({ category: id })

        await Category.deleteOne({ _id: id })

        res.status(200).json({ message: "Category and related items deleted" })

    } catch (error) {
        console.error("deleteCategory error:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const updateCategory = async (req, res) => {
    const { id } = req.params
    const { name } = req.body
    const userId = req.user._id

    try {
        if (!name) {
            return res.status(400).json({ message: "Category name required" })
        }

        const category = await Category.findOne({ _id: id, user: userId })
        if (!category) {
            return res.status(404).json({ message: "Category not found" })
        }

        category.name = name.toLowerCase()
        await category.save()

        res.status(200).json({ message: "Category updated", category })

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ message: "Duplicate category" })
        }
        console.error("updateCategory error:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const getCateGory = async (req, res) => {
    const user = req.user
    try {
        const categories = await Category.find({ user: user._id })
        if (!categories) {
            return res.status(400).json({ message: "User Dont have Category" })
        }
        res.status(200).json({ message: "Success", "user": user.username, categories })
    } catch (error) {
        console.log("error in GetCategory Route ", error)
        res.status(500).json({ message: "internal server error" })
    }
}