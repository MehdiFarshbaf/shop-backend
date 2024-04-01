import express from 'express'
import dotenv from 'dotenv'

//middlewares
import {errorHandler} from "./middlewares/errors.js";
import {connectDB} from "./config/connection.js";

// Load Config
dotenv.config()

const app = new express()

// BodyParser & headers
app.use(express.json())

//static folder
app.use(express.static("public"))

//connect to database
connectDB()

//Routes
app.get("/", (req, res) => res.json({
    success: true,
    message: "is true"
}))
// error handler
app.use(errorHandler)

app.listen(process.env.PORT, () => console.log(`server is listen on port : ${process.env.PORT}`))