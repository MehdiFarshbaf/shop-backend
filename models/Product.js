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
    category: String,
    Pcode: String,
    sendingType: String,
}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true},
    timestamps: true
})

export default mongoose.model("Product", productSchema)
