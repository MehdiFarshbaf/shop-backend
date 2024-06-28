import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    shortDescription: String,
    price: Number,
    discount: Number,
    mainImage: String,
    subImage: {type: [Object], default: []},
    model: String,
    quantity: Number,
    speciality: String,
    category_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
        required: true
    },
    Pcode: String,
    sendingType: {
        type: String,
        default: "fast",
        enum: ["fast", "today", "country"],
    },
}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true},
    timestamps: true
})

productSchema.virtual("category", {
    ref: "Category",
    localField: 'category_id',
    foreignField: "_id",
    justOne: true
})
export default mongoose.model("Product", productSchema)
