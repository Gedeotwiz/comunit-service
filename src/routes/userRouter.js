import express from "express"
import Controller from "../controller/userController.js"
import { EmailExist } from "../midleware/validation.js"
import { VerifyAccess } from "../midleware/virifyAccess.js"


const router = express.Router()
router.post("/user",EmailExist,Controller.signup)
router.post("/user/login",Controller.login)
router.get("/users",VerifyAccess("admin"),Controller.getAllUser)
router.delete("/users",Controller.deletAllUser)
router.get("/user/:id",Controller.getOneUser)
router.patch("/user/:id",Controller.updateUser)
export default router