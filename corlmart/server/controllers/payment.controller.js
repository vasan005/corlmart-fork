import Razorpay from 'razorpay';
import dotenv from 'dotenv';
import crypto from 'crypto';
import Payment from '../models/payment.model.js';
import User from '../models/user.model.js';
import mongoose from 'mongoose';
import sendEmail from '../utils/nodemailer.js';
import Cart from '../models/cart.model.js';
import PDFDocument  from 'pdfkit'
import fs from 'fs-extra'

dotenv.config();

export const RazorOrder=async (req,res)=>{
    try {
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_API_KEY_ID,
            key_secret:process.env.RAZORPAY_KEY_SECRET
        });
    
        const options= req.body;
        const order= await razorpay.orders.create(options);
         if(!order){
            return res.status(500).send("Error");
         }
         res.json(order);
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Error");
        
    }
}



export const RazorValidate = async (req, res) => {
    console.log(req.body);
    const { GST, totalValue, totalWithTaxes } = req.body;
    console.log(GST, totalValue, req?.body);
    const usercart = req?.body?.usercart;
    let assetIds;
    usercart.map((each) => (assetIds = each));
    console.log("assetId", assetIds);
    if (!req.body) return res.json({ status: 406, message: "invalid payment" });
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    // Constructing the message
    const message = `${razorpay_order_id}|${razorpay_payment_id}`;
    // Generating signature
    const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(message)
        .digest('hex');
    // Logging
    console.log("Generated Signature:", generated_signature);
    console.log("Received Signature:", razorpay_signature);
    // Comparing signatures
    if (generated_signature !== razorpay_signature) {
        return res.status(400).json({ message: "Transaction is not legit!" });
    }
    // If signatures match, returning success response
 
    const userDetails = await User.findOne({ _id: req?.body?.userId });
    if (!userDetails) console.log("userId not found");
    const Time = new Date().toLocaleTimeString('en-IN', {
        timeZone: 'Asia/Kolkata'
    });
    const currentDate = new Date();
    let subject = `Purchase Details`;
    let text = `orderId : ${razorpay_order_id} \npaymentId : ${razorpay_payment_id}\nProduct Amount : ${totalValue}\nGST : ${GST}\nTax with Price : ${totalWithTaxes}`;
    let sendEmailOtp = await sendEmail(userDetails?.email, subject, text);
    if (!sendEmailOtp) console.log("email send failed");
 
    const createPaymentDetails = await Payment.create({
        userDetails: {
            userId: userDetails?._id,
            userName: userDetails?.name,
            email: userDetails?.email,
            phone: userDetails?.phone,
            assetId: assetIds,
            paid: true
        },
        createdTime: Time,
        date: currentDate,
        ...req?.body
    });
 
    console.log(createPaymentDetails);
    if (createPaymentDetails) {
        res.json({
            message: "success",
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
            paid: createPaymentDetails?.userDetails?.paid || false
        });
    }
    console.log("userDetails", userDetails?._id);
    const deleteResult = await Cart.deleteMany({ userId: new mongoose.Types.ObjectId(userDetails?._id) });
    if (deleteResult) {
        console.log("The product was removed from the cart successfully.");
    } else {
        console.log("Failed to remove the product from the cart.");
    }

};

export const getAllPaymentDetails = async(req, res)=>{
    const paymentDetails = await Payment.find({})
    console.log(paymentDetails);
    if(!paymentDetails) return res.json({status:406, message:"payment Details Not found"})
        return res.json({status:200, message:paymentDetails})
}


export const getParticularPurchaseHistory = async(req, res)=>{
    const findHistory = await Payment.find({ "userDetails.userId": new mongoose.Types.ObjectId(req.query.userId )});
 
    if(!findHistory) return res.json({status:406, message:"history not found"})
        return res.json({status:200, message:findHistory})
}