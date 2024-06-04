import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    name: String,
    key: String,
    permissions: [{
        title: String,
        key: String
    }]
})

export default mongoose.model("Role", roleSchema)