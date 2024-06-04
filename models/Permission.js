import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema({
    title: String,
    key: String
})

export default mongoose.model("Permission", permissionSchema)