import express from "express"
import BookingServiceController from "../controller/bookingServiceController.js"
import { VerifyAccess } from "../midleware/virifyAccess.js"


const router = express.Router()

router.post("/",VerifyAccess(["client","admin"]),BookingServiceController.booking)
router.get("/",VerifyAccess(["provider","admin"]),BookingServiceController.getAllBooking)
router.put("/status/:id",VerifyAccess(["provider","admin"]),BookingServiceController.changeStatus)


export default router