
import express from "express"
const app = express()

app.use(express.json())

import dotenv from "dotenv"
dotenv.config();

import cookieParser from "cookie-parser";
app.use(cookieParser())

import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import connectToMongo from "./db/connecttoDB.js";

const PORT = process.env.PORT || 5000

app.get('/',(req,res)=>{
    res.send("home")
})
app.use('/api/messages',messageRoutes)
app.use('/api/auth',authRoutes)

app.listen(PORT,()=>{
    connectToMongo()
    console.log(`POrt ${PORT}`)
}) 