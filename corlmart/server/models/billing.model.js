import mongoose from "mongoose";
 
const billingSchema = new mongoose.Schema(
  {
    userId:{
        type:String,
        required: true
    },
   firstName:{
    type:String,
    required: true
   },
   lastName:{
    type:String,
    required: true
   },
   addressLine_1:{
    type:String,
    required: true
   },
   addressLine_2:{
    type:String,
    required: true
   },
   country:{
    type:String,
    required: true
   },
   region:{
    type:String,
    required: true
   },
   city:{
    type:String,
     required: true
   },
   zipCode:{
    type:Number,
    required: true
   }
   
},
  { timestamps: true }
);
 
const Billing = mongoose.model("Billing", billingSchema);
 
export default Billing;