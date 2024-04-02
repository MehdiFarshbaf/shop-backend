import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        mongoose.set("strictQuery", false)
        const conn = await mongoose.connect("mongodb://127.0.0.1:27017/shop", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}