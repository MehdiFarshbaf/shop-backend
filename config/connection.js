import mongoose from "mongoose";
import Permission from "../models/Permission.js";
import { permissionsList, superAdmin, superAdminRole } from "./config.js";
import Role from "../models/Role.js";
import Admin from "../models/Admin.js";
import { hashed } from "../helper/authHelper.js";

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
        let newSuperAdminRole = {}

        // check super_admin role is existed
        const findSuperAdminRole = await Role.findOne({ key: 'super_admin' })


        if (!findSuperAdminRole) {
            const role = await Role.create(superAdminRole)
            newSuperAdminRole = role
        } else {
            const newRole = await Role.findByIdAndUpdate(findSuperAdminRole._id, { permissions: superAdminRole.permissions }, { new: true })
            newSuperAdminRole = newRole
        }

        //create super admin

        //check exist 
        const findAdmin = await Admin.findOne({ email: superAdmin.email })
        if (!findAdmin) {
            const hashedPassword = await hashed(superAdmin.password)
            await Admin.create({ ...superAdmin, password: hashedPassword, role_id: newSuperAdminRole._id })
        }
        // end create super admin

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}