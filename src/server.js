import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import router from "./routes/index.js"
import bodyParser from "body-parser"


dotenv.config()


const app = express()

const port = process.env.PORT
const db = process.env.DATABASE

app.use(bodyParser.json())

app.get("/",(req, res) => {
  res.status(200).json({
    status: 200,
    message: 'WELCOME TO OUR COMMUNITY SERVICE',
  });
});

app.use("/api/v1",router)



app.listen(port,()=>{
    console.log(`Server running on ${port}`)
})


mongoose.connect(db).then(()=>{console.log("Database connected successfuly!!")})
.catch((error)=>{console.log(`Error is ${error}`)})




