import express from "express"
import Controller from "../controller/userController.js"
import { EmailExist } from "../midleware/validation.js"
import { VerifyAccess } from "../midleware/virifyAccess.js"
import { routeBodyValidation } from "../midleware/requestMidleware.js"
import { signinSchema } from "../validation/validation.js"


const router = express.Router()
router.post("/",EmailExist,Controller.signup)
router.post("/login",routeBodyValidation(signinSchema),Controller.login)
router.get("/users",VerifyAccess(["admin"]),Controller.getAllUser)
router.delete("/users",VerifyAccess(["admin"]),Controller.deletAllUser)
router.get("/:id",VerifyAccess(["admin"]),Controller.getOneUser)
router.patch("/:id",VerifyAccess(["admin"]),Controller.updateUser)
export default router