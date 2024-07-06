import mongoose from "mongoose";

const faqSchema = new mongoose.Schema({
    question: {
        type: String,
        default: "",
        required: [true, "سوال الزامی است."]
    },
    answer: {
        type: String,
        default: "",
        required: [true, "پاسخ الزامی است."]
    }
}, {
    timestamps: true
})

export default mongoose.model("FAQ", faqSchema)