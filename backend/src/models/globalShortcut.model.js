import mongoose from "mongoose"

const globalShortcutSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        url: {
            type: String,
            required: true,
            trim: true
        },

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "GlobalCategory",
            required: true
        },

        isActive: {
            type: Boolean,
            default: true
        },

        order: {
            type: Number,
            default: 0 
        },

        starCount:{
            type:Number,
            default:0
        }
    },
    { timestamps: true }
)

globalShortcutSchema.index(
    { title: 1, category: 1 },
    { unique: true }
)

export const GlobalShortcut = mongoose.model("GlobalShortcut", globalShortcutSchema)
