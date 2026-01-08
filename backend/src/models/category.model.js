import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true })

categorySchema.index(
    { user: 1, name: 1 },
    { unique: true }
)

export const Category = mongoose.model("Category", categorySchema)
