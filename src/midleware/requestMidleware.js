import Joi from "joi"

export const routeBodyValidation = (schema)=> async (req,res,next)=>{
    try {
        const {error} = schema.validate(req.body,{abortEarly:false})
        if(error){
            const errorMessage =`${error.details[0].message} in the body`  
            return res.status(400).json({status:400,message:errorMessage})
        }
        return next()
    } catch (error) {
       return res.status(500).json({status:500,message:`error is ${error}`})
    }
}
