import User from "../model/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { generateToken } from "../utils/jwtUtils.js"


class Controller{

 static signup=async(req,res)=> {
      const {names,email,password,role} = req.body
       const hashPassword = bcrypt.hashSync(req.body.password,10)
      try {
          const user = await User.create({names,email,password:hashPassword,role})
      if(!user){
         return res.status(404).json({message:"user not found"})
      }else{
         return res.status(201).json({message:"User successfuly created",user})
      }
      } catch (error) {
         return res.status(500).json({message:`Create user failed ${error}`})
        
      }
     
}

static login = async(req,res)=>{
   const {email,password} = req.body
   console.log(req.body)
   const user = await User.findOne({email})
   if(!user){
      return res.status(404).json({message:"Invalid email or password"})
   }else{
      const comparePassword = bcrypt.compareSync(password,user.password)
      if(!comparePassword){
         return res.status(404).json({message:"Invald email or password"})
      }else{
       const token = generateToken(user?._id)
         return res.status(201).json({message:"Login successfuly",token})
      }
   }
}

static getAllUser = async(req,res)=>{
   const users = await User.find()
   if(!users){
      return res.status(404).json({message:'User not found'})
   }else{
      return res.status(200).json({message:"user successfuly retrived",users})
   }
}

static deletAllUser = async(req,res)=>{
   const users = await User.deleteMany()
   if(!users){
      return res.status(404).json({message:'User not found'})
   }else{
      return res.status(200).json({message:"user successfuly deleted",users})
   }
}

static getOneUser = async(req,res)=>{
   const id = req.params.id
   const user = await User.findById(id)
   if(!user){
       return res.status(404).json({message:'User not found'})
   }else{
      return res.status(200).json({message:"user successfuly retrived",user})
   }
}

static updateUser = async(req,res)=>{
   const id = req.params.id
   const user = await User.findByIdAndUpdate(id,req.body,{new:true})
   if(!user){
       return res.status(404).json({message:'User not found'})
   }else{
      return res.status(201).json({message:"user successfuly updated",user})
   }
}

}
export default Controller