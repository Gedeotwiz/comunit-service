import jwt from "jsonwebtoken"

export function VerifyAccess(passRole){
    return (req,res,next)=>{
       const token = req.headers['auth-token']
       if(!token){
         return res.status(404).json({message:"No token provided"})
       }else{
         try {
            const verifyToken = jwt.verify(token,process.env.SCRET_KEY,{expiresIn:'1d'})
            req.user=verifyToken.user
            if(passRole != verifyToken.user.role){
                return res.status(401).json({message:"Please you don't have access"})
            }else{
                return next()
            }
         } catch (error) {
            if((error.name = "JsonWebTokenError")){
                return res.status(401).json({message:"Invalid token or expired token"})
            }else{
                return res.status(500).json({message:`error is ${error}`})
            }
         }
       }
    }
}