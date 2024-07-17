import express from 'express'
import dotenv from 'dotenv'
import {connectDB} from "./config/connection.js";
import cors from 'cors'
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload'


//middlewares
import {errorHandler} from "./middlewares/errors.js";
import {headers} from "./middlewares/headers.js";

//routes
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import permissionRoutes from "./routes/permissionRoutes.js";
import roleRoutes from "./routes/roleRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import faqRoutes from "./routes/faqRoutes.js";

// Load Config
// if (process.env.NODE_ENV == "development") {
    dotenv.config()
// }

const app = new express()

// BodyParser & headers
// app.use(cors({credentials: true, origin: 'http://localhost:3003'}))
app.use(cors({credentials: true, origin: '*'}))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())

app.use(fileUpload())
app.use(headers)


//static folder
app.use(express.static("public"))


//connect to database
connectDB()

//Routes

app.use("/api/user", userRoutes)
app.use("/api/product", productRoutes)
app.use("/api/category", categoryRoutes)
app.use("/api/blog", blogRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/permission", permissionRoutes)
app.use("/api/faq", faqRoutes)
app.use("/api/role", roleRoutes)
app.use("/api/dashboard", dashboardRoutes)

// error handler
app.use(errorHandler)


const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))