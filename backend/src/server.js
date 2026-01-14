import express from "express"
import authRoute from "./routes/auth.routes.js"
import cateGoryRoute from "./routes/category.routes.js"
import shortcutRoute from "./routes/shortcut.routes.js"
import adminRoute from "./routes/admin.routes.js"
import dotenv from "dotenv"
import connectDb from "./config/Db.js"
import cookieParser from "cookie-parser"
import cors from "cors"
const app = express()
dotenv.config()
const port = process.env.PORT || 3000

//----------------------------------------- middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true 
}));
app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())


app.use('/api/auth', authRoute)
app.use('/api/category', cateGoryRoute)
app.use('/api/shortcut', shortcutRoute)
app.use('/api/admin', adminRoute)

connectDb().then(() => {
    app.listen(port, () => {
        console.log(`visit : http://localhost:${port}`)
    })
})