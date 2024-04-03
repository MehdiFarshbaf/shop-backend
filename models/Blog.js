import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: String,
    description: String,
    shortDescription: String,
    mainImage: String,
    writer: String,
    category: String

})

export default mongoose.model("Blog", blogSchema)