import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: String,
    description: String,
    shortDescription: String,
    mainImage: String,
    writer: String,
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },

},{
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})
blogSchema.virtual('category', {
    ref: 'Category',
    localField: 'category_id',
    foreignField: '_id',
    justOne: true, // default is false
})
export default mongoose.model("Blog", blogSchema)