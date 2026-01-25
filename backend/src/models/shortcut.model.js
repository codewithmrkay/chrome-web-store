import mongoose from "mongoose"

const shortcutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    source: {
      type: String,
      enum: ["user", "global"],
      default: "user"
    },

    globalShortcutId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GlobalShortcut",
      default: null
    }
  },
  { timestamps: true }
)

shortcutSchema.index({ category: 1, url: 1 }, { unique: true })

export const Shortcut = mongoose.model("Shortcut", shortcutSchema)
