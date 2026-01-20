import express from "express"
import userRouter from "./userRouter.js"
import categoryRouter from "./categoryRouter.js"
import serviceRouter from "./serviceRouter.js"

const router = express.Router()
  router.use("/user",userRouter)
  router.use("/category",categoryRouter)
  router.use("/service",serviceRouter)
export default router