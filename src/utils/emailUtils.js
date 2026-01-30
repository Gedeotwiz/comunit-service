import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config()

export const sendEmailNotification = async({receiver,content,sub}) =>{

    const email=process.env.NODEMAILER_EMAIL
    const pass = process.env.NODEMAILER_PASSWORD

    console.log(email,pass)
   
    const transporter = nodemailer.createTransport({
        service:'smtp',
        auth:{
            user:email,
            password:pass
        }
    })

    await transporter.sendMail({
       from:process.env.NODEMAILER_EMAIL,
       to:receiver,
       subject:sub,
       html:`${content}`
    })
}