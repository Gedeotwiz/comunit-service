import express from "express"
import Controller from "../controller/userController.js"


const router = express.Router()
router.post("/user",Controller.signup)
export default router