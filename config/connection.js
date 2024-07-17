import mongoose from "mongoose";
import Permission from "../models/Permission.js";
import {permissionsList, superAdmin, superAdminRole} from "./config.js";
import Role from "../models/Role.js";
import Admin from "../models/Admin.js";
import {hashed} from "../helper/authHelper.js";

export const connectDB = async () => {
    try {
        mongoose.set("strictQuery", false)
        // const conn = await mongoose.connect("mongodb://farshbaf_shop:Mehdi14439@localhost:27017/farshbaf_shop", {
        const conn = await mongoose.connect(process.env.NODE_ENV == "development" ? "mongodb://127.0.0.1:27017/shop" : "mongodb://farshbaf_shop:Mehdi14439@localhost:27017/farshbaf_shop", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        //create permissions
        await Permission.deleteMany()
        await Permission.insertMany(permissionsList)

        //create super admin role
        await Role.deleteOne({key: 'super_admin'})
        const role = await Role.create(superAdminRole)

        //create super admin
        const hashedPassword = await hashed(superAdmin.password)
        await Admin.deleteOne({email: superAdmin.email})
        await Admin.create({...superAdmin, password: hashedPassword, role: role._id})

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}