import mongoose from "mongoose";
import { GlobalCategory } from "../models/globalCategory.model.js";
import { GlobalShortcut } from "../models/globalShortcut.model.js";

export const createGlobalCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name)
      return res.status(400).json({ message: "Category name required" });

    const exists = await GlobalCategory.findOne({ name: name.toLowerCase() });
    if (exists)
      return res.status(409).json({ message: "Category already exists" });

    const category = await GlobalCategory.create({
      name: name.toLowerCase()
    });

    res.status(201).json(category);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Duplicate category" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};


export const deleteGlobalCategory = async (req, res) => {
  try {
    const { id } = req.params;

    await GlobalShortcut.deleteMany({ category: id });
    await GlobalCategory.findByIdAndDelete(id);

    res.status(200).json({ message: "Category and shortcuts deleted" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getGlobalCategory = async (req, res) => {
  try {

    const result = await GlobalCategory.find();

    res.status(200).json({ message: "get global Category",result});
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};


export const createGlobalShortcut = async (req, res) => {
  try {
    const { title, url, categoryId } = req.body;

    if (!title || !url || !categoryId)
      return res.status(400).json({ message: "All fields required" });

    const validCatgory = await GlobalCategory.findById(categoryId)

    if (!validCatgory) {
      return res.status(400).json({ message: "Category is Not GlobalCategory" });
    }

    const shortcut = await GlobalShortcut.create({
      title,
      url,
      category: categoryId
    });

    res.status(201).json(shortcut);
  } catch (error) {
    console.log(error)
    if (error.code === 11000) {
      return res.status(409).json({ message: "Duplicate shortcut" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getGlobalShortcut = async (req, res) => {
  try {
    const Globalshortcuts = await GlobalShortcut.find().populate("category","name").sort({createdAt:-1});
    res.status(201).json({message:"Global Shortcut Get Successfully",Globalshortcuts});
  } catch (error) {
    console.log("error to get Global Shorcuts",error)
    res.status(500).json({ message: "Internal server error" });
  }
};


export const bulkAddGlobalShortcuts = async (req, res) => {
  try {
    const { categoryId, shortcuts } = req.body;

    if (!categoryId || !Array.isArray(shortcuts) || shortcuts.length === 0) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const validCateGoryId = mongoose.isValidObjectId(categoryId)
    if (!validCateGoryId) {
      return res.status(400).json({ message: "Category is Not valid" });
    }

    const validCatgory = await GlobalCategory.findById(categoryId)

    if (!validCatgory) {
      return res.status(400).json({ message: "Category is Not GlobalCategory" });
    }
    const payload = shortcuts.map(s => ({
      title: s.title,
      url: s.url,
      category: categoryId
    }));

    const inserted = await GlobalShortcut.insertMany(payload, {
      ordered: false
    });

    res.status(201).json({
      message: "Bulk shortcuts added",
      count: inserted.length
    });
  } catch (error) {
    console.log("error in Bulk GlobalShortcut Creation", error)
    if (error.code === 11000) {
      return res.status(207).json({
        message: "Some shortcuts were duplicates",
      });
    }
    res.status(500).json({ message: "Internal server oeeees" });
  }
};


export const updateGlobalShortcut = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, url } = req.body;
    const validShortcutId = mongoose.isValidObjectId(id)
    if (!validShortcutId) {
      return res.status(400).json({ message: "Shortcut Id is Not valid" });
    }
    const updated = await GlobalShortcut.findByIdAndUpdate(
      id,
      { title, url },
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Shortcut not found" });

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};


export const deleteGlobalShortcut = async (req, res) => {
  try {
    const { id } = req.params;
    const validShortcutId = mongoose.isValidObjectId(id)
    if (!validShortcutId) {
      return res.status(400).json({ message: "Shortcut Id is Not valid" });
    }
    await GlobalShortcut.findByIdAndDelete(id);

    res.status(200).json({ message: "Shortcut deleted" });
  } catch (error) {
    console.log("error in delete gloal shortcuts : ", error)
    res.status(500).json({ message: "Internal server error" });
  }
};
