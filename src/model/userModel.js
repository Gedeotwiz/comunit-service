import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    names:{
        type:String,
        required:[true,"Please provide your name"]
    },
    email:{
        type:String,
        required:[true,'Please provide your email'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'Please enter your password']
    },
    role:{
        type:String,
        enum:['client','provider','admin'],
        default:"client"
    },
    createdAt:{
       type:Date,
       default: new Date(Date.now()) 
    }
})

const User = mongoose.model("User",userSchema)
export default User