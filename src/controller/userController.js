import User from "../model/userModel.js"
class Controller{

 static signup=async(req,res)=> {
      const {names,email,password,role} = req.body
      try {
          const user = await User.create({names,email,password,role})
      if(!user){
         return res.status(404).json({message:"user not found"})
      }else{
         return res.status(201).json({message:"User successfuly created",user})
      }
      } catch (error) {
         return res.status(500).json({message:`Create user failed ${error}`})
        
      }
     
}

   

}
export default Controller