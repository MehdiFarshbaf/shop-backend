import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    name: String,
    key: String,
    permissions: [{
        title: String,
        key: String
    }]
},{
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})
roleSchema.virtual('admins', {
    ref: 'Admin',
    localField: '_id',
    foreignField: 'role_id',
    // justOne: true, // default is false
})

export default mongoose.model("Role", roleSchema)