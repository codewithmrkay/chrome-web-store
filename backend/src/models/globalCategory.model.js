import mongoose from "mongoose"

const globalCategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true
        },

        icon: {
            type: String, // emoji or icon-name or image url
            default: "📁"
        },

        isActive: {
            type: Boolean,
            default: true
        },

        createdBy: {
            type: String,
            default: "system" // future: admin id
        }
    },
    { timestamps: true }
)

export const GlobalCategory = mongoose.model("GlobalCategory", globalCategorySchema)
