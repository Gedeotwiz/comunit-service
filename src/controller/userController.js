import User from "../model/userModel.js"
import bcrypt from "bcrypt"
import { generateToken } from "../utils/jwtUtils.js"
import { sendEmail } from "../services/sendEmail.js"
import { verifyAccountTemplate } from "../utils/verifyEmailTamplent.js"
import { DecodToken } from "../utils/jwtUtils.js"
import { resetPasswordTemplate } from "../routes/resetPasswordTamplent.js"


class Controller{

 static signup=async(req,res)=> {
      const {names,email,password,role,verifyToken} = req.body
       const hashPassword = bcrypt.hashSync(req.body.password,10)
      try {
          const user = await User.create({names,email,password:hashPassword,role})
          const token = generateToken(user?.id)
          user.verifyToken = token
          user.save()

          const verifyLink = `${process.env.CLIENT_URL}/verified-email/${token}`
          await sendEmail(verifyAccountTemplate(email,verifyLink))
      
         return res.status(201).json({message:"User successfuly created",user})
      } catch (error) {
         return res.status(500).json({message:`Create user failed ${error}`})
        
      }
     
}

static verifyEmailAcont = async (req, res) => {
  try {
    const { verifyToken } = req.params;

    const decodedToken = DecodToken(verifyToken);
    if (!decodedToken?.id) {
      return res.status(400).json({ message: "Invalid token" });
    }

    const user = await User.findById(decodedToken.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(200).json({
        status: 200,
        message: "Email already verified",
      });
    }

    user.isVerified = true;
    await user.save();

    return res.status(200).json({
      status: 200,
      message: "Email verified successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


static login = async(req,res)=>{
   const {email,password} = req.body
   const user = await User.findOne({email})
   if(!user){
      return res.status(404).json({message:"Invalid email or password"})
   }else if(user.isVerified !== true){
       return res.status(404).json({status:404,message:"Please verify your accont"})
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

static forgotPassword = async (req,res) =>{
   const email = req.body
   try {
      const user = await User.findOne(email)
      
   if(!user){
      return res.status(404).json({status:404,message:"user not found"})
   }

   const token = generateToken(user?._id)
   user.resetPasswordToken =token
   user.save()

   const link = `${process.env.CLIENT_URL}/verified-email/${token}`
   await sendEmail(resetPasswordTemplate(user.email,link))
   return res.status(201).json({status:201,message:"check your email notified"})
   } catch (error) {
      return res.status(500).json({status:500,error})
   }
}

static resetPassword = async (req,res)=>{
   const {newPassword} = req.body
   const token = req.params.token

   const decodedToken = DecodToken(token)

   const user = await User.findById(decodedToken?.id)
     if(!user){
      return res.status(404).json({status:404,message:"user not found"})
   }
   user.password = bcrypt.hashSync(newPassword,10)
   user.resetPasswordToken=undefined
   await user.save()
   return res.status(201).json({status:201,message:"Password already changed"})
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