/** @format */

import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { verifyAccountTemplate } from '../utils/emailTamplent.js';

dotenv.config();

export const sendEmail = async (email) => {
  try {
    const transporter = await nodemailer.createTransport({
      port: Number(process.env.SMTP_HOST_PORT),
      host: process.env.SMTP_HOST,
      secure: true,
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    
      return await transporter.sendMail(
        verifyAccountTemplate(
          email?.receiverEmail,
          email?.serviceDescription,
          email?.title,
        ),
    )
  } catch (error) {
    console.log('Error while sending Email', error);
  }
};
