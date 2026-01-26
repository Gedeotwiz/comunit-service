import express from "express"
import BookingServiceController from "../controller/bookingServiceController.js"
import { VerifyAccess } from "../midleware/virifyAccess.js"


const router = express.Router()

router.post("/",VerifyAccess("client"),BookingServiceController.booking)
router.get("/",VerifyAccess("provider"),BookingServiceController.getAllBooking)
router.put("/status/:id",VerifyAccess("provider"),BookingServiceController.changeStatus)


export default router