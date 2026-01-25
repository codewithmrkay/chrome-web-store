import mongoose from "mongoose"
import { Category } from "../models/category.model.js"
import { GlobalShortcut } from "../models/globalShortcut.model.js"
import { Shortcut } from "../models/shortcut.model.js"

export const createShortcut = async (req, res) => {
  const { title, url, categoryId } = req.body
  const userId = req.user._id

  try {
    if (!title || !url || !categoryId) {
      return res.status(400).json({ message: "All fields required" })
    }

    const category = await Category.findOne({
      _id: categoryId,
      user: userId
    })

    if (!category) {
      return res.status(404).json({ message: "Category not found" })
    }

    const shortcut = await Shortcut.create({
      title,
      url,
      category: categoryId,
      user: userId
    })

    res.status(201).json(shortcut)

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        error: 'This shortcut already exists in this category.'
      });
    }
    console.error("createShortcut error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}
export const getShortcuts = async (req, res) => {
  const userId = req.user._id

  try {
    const shortcuts = await Shortcut.find({ user: userId })
      .populate("category", "name")
      .sort({ createdAt: -1 })

    res.status(200).json(shortcuts)

  } catch (error) {
    console.error("getShortcuts error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}
export const updateShortcut = async (req, res) => {
  const { id } = req.params
  const { title, url } = req.body
  const userId = req.user._id

  try {
    const shortcut = await Shortcut.findOne({
      _id: id,
      user: userId
    })

    if (!shortcut) {
      return res.status(404).json({ message: "Shortcut not found" })
    }

    if (title) shortcut.title = title
    if (url) shortcut.url = url

    await shortcut.save()

    res.status(200).json({ message: "Shortcut updated", shortcut })

  } catch (error) {
    console.error("updateShortcut error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}
export const deleteShortcut = async (req, res) => {
  const { id } = req.params
  const userId = req.user._id

  try {
    const shortcut = await Shortcut.findOneAndDelete({
      _id: id,
      user: userId
    })

    if (!shortcut) {
      return res.status(404).json({ message: "Shortcut not found" })
    }

    res.status(200).json({ message: "Shortcut deleted" })

  } catch (error) {
    console.error("deleteShortcut error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

export const updateGlobalShortcutStarCount = async (req, res) => {
  const userId = req.user._id;
  const { id: globalShortcutId } = req.params;
  const { userCategoryId } = req.body;

  try {
    const globalShortcut = await GlobalShortcut.findById(globalShortcutId);
    if (!globalShortcut) {
      return res.status(404).json({ message: "Global shortcut not found" });
    }

    const existing = await Shortcut.findOne({
      user: userId,
      globalShortcutId,
      source: "global",
    });

    // REMOVE
    if (existing) {
      await existing.deleteOne();

      await GlobalShortcut.updateOne(
        { _id: globalShortcutId, starCount: { $gt: 0 } },
        { $inc: { starCount: -1 } }
      );

      return res.status(200).json({
        action: "removed",
        starCountChange: -1,
      });
    }

    // ADD
    if (!userCategoryId) {
      return res.status(400).json({ message: "Category required" });
    }

    await Shortcut.create({
      title: globalShortcut.title,
      url: globalShortcut.url,
      category: userCategoryId,
      user: userId,
      source: "global",
      globalShortcutId,
    });

    await GlobalShortcut.updateOne(
      { _id: globalShortcutId },
      { $inc: { starCount: 1 } }
    );

    res.status(200).json({
      action: "added",
      starCountChange: 1,
    });
  } catch (error) {
    console.error("Star toggle error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


