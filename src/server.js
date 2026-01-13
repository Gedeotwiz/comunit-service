import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"


dotenv.config()


const app = express()

const port = process.env.PORT
const db = process.env.DATABASE

app.listen(port,()=>{
    console.log(`Server running on ${port}`)
})

mongoose.connect(db).then(()=>{console.log("Database connected successfuly!!")})
.catch((error)=>{console.log(`Error is ${error}`)})