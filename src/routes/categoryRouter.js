import express from "express"
import CategoryController from "../controller/categoryController.js"
import { VerifyAccess } from "../midleware/virifyAccess.js"


const router = express.Router()
 router.post("/create",VerifyAccess(["provider","admin"]),CategoryController.createCategory)
 router.get("/",CategoryController.findAllCategory)
export default router