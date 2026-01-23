import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    client:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    service:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Service"

    },
    date:{
        type:Date,
        required:[true,"Please sepecify date you want your this service"]
    },
    time:{
        type:String,
        required:[true,"Please sepecify time you want your this service"]
    },
    status:{
        type:String,
        enum:["pending","accepted","completed","cancelled"],
        default:"pending"
    },
    notes:{
        type:String,
        required:false
    },
    createdAt:{
        type:Date,
        default: new Date(Date.now())
    }
})
bookingSchema.pre(/^find/,function(next){
    this.populate([
        {path:"client",select:"names email"},
        {path:"service",select:"title"}
    ])
})

const BookingService = mongoose.model("BookingService",bookingSchema)
export default BookingService