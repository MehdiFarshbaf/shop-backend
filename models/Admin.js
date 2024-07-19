import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        default: "",
        trim: true,
        unique: [true, "ایمیل نباید تکراری باشد."]
    },
    password: {
        type: String,
        default: ""
    },
    fullname: {
        type: String,
        trim: true,
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
        default: "",
        trim: true,
        unique: [true, "شماره موبایل نباید تکراری باشد."]
    },
    role_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
        required: [true, "شناسه نقش الزامی است."]
    },
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetExpire: Date,
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

adminSchema.virtual("role", {
    ref: "Role",
    localField: "role_id",
    foreignField: '_id',
    justOne: true
})
export default mongoose.model("Admin", adminSchema)