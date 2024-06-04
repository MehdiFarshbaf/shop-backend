import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        default: ""
    },
    fullname: {
        type: String,
        default: "مدیر سیستم"
    },
    image: {
        type: String,
        default: ""
    },
    url: {
        type: String,
        default: ""
    },
    mobile: {
        type: String,
        default: ""
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
        required: [true, "شناسه نقش الزامی است."]
    },
}, {
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})
export default mongoose.model("Admin", adminSchema)