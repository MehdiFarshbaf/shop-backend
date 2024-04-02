import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, ""],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, ""],
        trim: true
    },
    username: {
        type: String,
        required: [true, ""],
        trim: true
    },
    email: {
        type: String,
        unique: true,
        trim: true
    },
    mobile: String,
    password: String,
    isAdmin: {
        type: Boolean,
        default: false,
        enum: {
            values: [true, false],
            message: '{VALUE} is not supported'
        }
    },
    address: String
}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true},
    timestamps: true
})
userSchema
    .virtual('fullname')
    .get(function () {
        return this.firstName + ' ' + this.lastName;
    });
export default mongoose.model("User", userSchema)