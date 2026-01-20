import express from "express"
import Controller from "../controller/userController.js"
import { EmailExist } from "../midleware/validation.js"
import { VerifyAccess } from "../midleware/virifyAccess.js"


const router = express.Router()
router.post("/",EmailExist,Controller.signup)
router.post("/login",Controller.login)
router.get("/users",VerifyAccess("admin"),Controller.getAllUser)
router.delete("/users",Controller.deletAllUser)
router.get("/:id",Controller.getOneUser)
router.patch("/:id",Controller.updateUser)
export default router