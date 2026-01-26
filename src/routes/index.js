import express from "express"
import userRouter from "./userRouter.js"
import categoryRouter from "./categoryRouter.js"
import serviceRouter from "./serviceRouter.js"
import bookingRouter from "./bookingRouter.js"

const router = express.Router()
  router.use("/user",userRouter)
  router.use("/category",categoryRouter)
  router.use("/service",serviceRouter)
  router.use("/booking",bookingRouter)
export default router