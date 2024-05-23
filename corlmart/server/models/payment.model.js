import { Timestamp } from "mongodb";
import mongoose from "mongoose";
const PaymentSchema = new mongoose.Schema({
  userDetails:{
    type:Object,
    required:true
  },
  usercart : {
    type:Object,
    required:true
  },
  razorpay_order_id:{
    type:String,
    required:true
  },
  razorpay_payment_id:{
    type:String,
    required:true
  },
  createdTime:{
    type:String,
    required:true
  },
  paid:{
  type: Boolean,
  },
  date:{
    type:String,
    required:true
  }
}
);
const PaymentModel = mongoose.model("PaymentModel", PaymentSchema);
export default PaymentModel;