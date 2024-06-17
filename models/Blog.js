import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: String,
    description: String,
    shortDescription: String,
    mainImage: String,
    writer: String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },

})

export default mongoose.model("Blog", blogSchema)