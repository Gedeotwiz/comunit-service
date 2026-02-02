import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_HOST_PORT),
  secure: true,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

export const sendEmail = async (mailOptions) => {
  try {
    return await transporter.sendMail({
      from: `COMMUNITY SERVICES <${process.env.SMTP_GMAIL_SENDER_EMAIL}>`,
      ...mailOptions
    });
  } catch (error) {
    console.error("Email sending failed:", error);
    throw error;
  }
};