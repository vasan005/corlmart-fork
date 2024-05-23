import mongoose from "mongoose";
const OtpSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            required:true
        },
        otp:{
            type:Number,
            required:true
        },
        createdTime:{
            type: String,
            required:true
        },
        expiredTime:{
            type: String,
            required:true
        }
    }
)
 
const Otp = mongoose.model("Otp", OtpSchema);
 
export default Otp;