import express from 'express'
import dotenv from 'dotenv'
import {connectDB} from "./config/connection.js";

//middlewares
import {errorHandler} from "./middlewares/errors.js";

//routes
import userRoutes from "./routes/userRoutes.js";

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
app.use("/api/user", userRoutes)

// error handler
app.use(errorHandler)
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`server is listen on port : ${port}`))