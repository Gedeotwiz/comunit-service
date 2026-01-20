import express from "express"
import CategoryController from "../controller/categoryController.js"


const router = express.Router()
 router.post("/create",CategoryController.createCategory)
 router.get("/",CategoryController.findAllCategory)
export default router