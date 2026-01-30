import express from "express"
import CategoryController from "../controller/categoryController.js"
import { VerifyAccess } from "../midleware/virifyAccess.js"
import { routeBodyValidation } from "../midleware/requestMidleware.js"
import { createCategorySchema } from "../validation/validation.js"


const router = express.Router()
 router.post("/create",routeBodyValidation(createCategorySchema),VerifyAccess(["provider","admin"]),CategoryController.createCategory)
 router.get("/",CategoryController.findAllCategory)
export default router