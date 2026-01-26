import BookingService from "../model/bookingModel.js";
import Service from "../model/serviceModel.js";


class BookingServiceController{
    static booking=async(req,res)=>{
        const {serviceId,date,time,status,notes}=req.body

        const service = await Service.findById(serviceId)
        if(!serviceId){
            return res.status(404).json({message:"service not found"})
        }else{
            const userId = req.user?._id 
            if(!userId){
                return res.status(404).json({message:"Please login"})
            }else{
                let bookingService = await BookingService.create({
                    serviceId,
                    clientId:userId,
                    date,
                    time,
                    status,
                    notes
                })

                 bookingService = await bookingService.populate([
                    {path:"clientId",select:"names email"},
                    {path:"serviceId",select:"title"}
                 ])

                 return res.status(201).json({message:"Booking successfuly",bookingService})
            }
        }
    }

    static getAllBooking = async(req,res)=>{
        const bookig = await BookingService.find()
        if(!bookig){
            return res.status(404).json({message:"booking service not found"})
        }else{
            return res.status(200).json({message:"booking service successfuly retrived",bookig})
        }
    }

    static changeStatus= async (req,res) =>{
        const id = req.params.id
        if(!id){
            return res.status(404).json({message:`There are no service booked on this ${id}`})
        }else{
            const booking = await BookingService.findByIdAndUpdate(id,req.body,{new:true})
            return res.status(201).json({message:"Status successfuly updated",booking})
        }
    }
}

export default BookingServiceController