import express from "express"
import authRoute from "./routes/auth.routes.js"
import dotenv from "dotenv"
import connectDb from "./config/Db.js"
import cookieParser from "cookie-parser"
const app = express()
dotenv.config()
const port = process.env.PORT || 3000

//----------------------------------------- middleware
app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())


app.use('/api/auth',authRoute)

connectDb().then(() => {
    app.listen(port, () => {
     console.log(`visit : http://localhost:${port}`)
    })
})