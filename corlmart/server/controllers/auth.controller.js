import User from "../models/user.model.js";
// import UserAsGuest from "../models/userasguest.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import Otp from "../models/otp.model.js";
import utils from "../utils/generateOtp.js"
import sendEmail  from "../utils/nodemailer.js";
import mongoose from "mongoose";
 
 
export const getOtp = async (req, res) => {
  try {
    if (!req.body?.email) return res.json({ status: 406, message: "Email is required" });
    const otp = utils.generateOtp();
    // time management start
    const localTime = new Date().toLocaleTimeString('en-IN', {
      timeZone: 'Asia/Kolkata'
    });
 
    const currentTime = new Date();
    const futureTime = new Date(currentTime.getTime() + 1 * 60000);
    const expiredTime = futureTime.toLocaleTimeString()
    console.log("expired",expiredTime);
    console.log("curree",currentTime);
    // time management end
 
    let subject = `verify OTP`
    let text = `To verify your email address, please use the following One Time Password (OTP):
    ${otp}
    Do not share this OTP with anyone. Digamend- takes your account security very seriously. Digamend Customer Service will never ask you to disclose or
    verify your Digamend password, OTP, credit card, or banking account number. If you receive a suspicious
    email with a link to update your account information, do not click on the link—instead, report the email to Digamend for investigation.
    Thank you!`
 
 
 
      let sendEmailOtp = await sendEmail(req.body?.email, otp, subject, text);
      if(sendEmail){
        let verifyOtp = await Otp.findOne({email:req?.body?.email})
        if(verifyOtp){
          const updateOtp = await Otp.updateOne({email:req?.body?.email}, {$set:{otp:otp, createdTime:localTime, expiredTime:expiredTime}})
          if(updateOtp){
            return res.json({status:200,message: "OTP sent successfully" })
          }else{
            return res.json({status: 406, message: "OTP creation failed"})
          }
        }
        console.log("expired time",expiredTime);
        const createOtp = await Otp.create({email:req?.body?.email, otp:otp,createdTime:localTime, expiredTime:expiredTime})
        if(createOtp){
          res.json({ status: 200, message: "OTP sent successfully" });
        }else{
          return res.json({status: 406, message: "OTP creation failed"})
        }
      }else{
        return res.json("otp trigger failed")
      }
  } catch (error) {
      res.status(500).json({ status: 500, message: error.message });
  }
};
 
//signUp
 
export const createUser = async(req, res)=>{
 
try {
const { name, email, phone, password, confirmpassword, otp } = req.body;
const hashedPassword = bcryptjs.hashSync(password, 10);
if(!name || !email || !phone || !password || !confirmpassword || !otp) return res.json({status:406, status:"values required"})
if(password !== confirmpassword) return res.json({status:406, message:"confirmPassword is wrong"})
const checkUser = await User.findOne({email:email})
if(checkUser) return res.json({status:406, message:"this email id already have a account"})
 
let verifyOtp = await Otp.findOne({email:req?.body?.email, otp:req?.body?.otp})
const currentTime = new Date().toLocaleTimeString('en-IN', {
  timeZone: 'Asia/Kolkata'
});console.log("current time",currentTime);
 
if(currentTime > verifyOtp?.expiredTime) return res.json({status:200, message:"time verification time up please wait 5 minutes after resend otp"})
 
if(verifyOtp) {
  const createUser = await User.create({
    name : name,
    email:email,
    phone:phone,
    password:hashedPassword,
    confirmpassword:hashedPassword,
    verifiedEmail:true
  })
  if(createUser){
      return res.json(createUser)
  }else{
  return res.json({status:406, message:"user created failed"})
  }
}else{
  return res.json({status:406, message:"invaid otp"})
}
  } catch (err) {
    return res.json({status:500, message:err.message})
  }
 
}
 
 
 
 
//Signin functionality
//signin
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
 
  try {
    // Validate input fields
    if (!email || !password || email === "" || password === "") {
      return next(errorHandler(400, "All fields are required"));
    }
 
    // Find user by email
    const validUser = await User.findOne({ email });
 
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }
 
    // Compare passwords
    const validPassword = bcryptjs.compareSync(password, validUser.password);
 
    if (!validPassword) {
      return next(errorHandler(400, "Invalid password"));
    }
 
    // Generate JWT token
    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET
    );
 
    // Remove sensitive data from user object (e.g., password)
    const { password: userPassword,confirmpassword, ...userInfo } = validUser.toObject();
 
    // Set cookie with token (secure: true for HTTPS)
    res.cookie('token', token, { httpOnly: true, secure: true });
 
    // Return success message and token with user info
    return res.status(200).json({ message: "Login success", token, ...userInfo });
  } catch (error) {
    // Handle errors
    next(error); // Pass error to global error handler
  }
};
 
//signup using google
export const google = async (req, res, next) => {
  try {
    const { email, name } = req.body;
console.log(email, name)
    const user = await User.findOne({ email });
    if(user){
      res.status(401).json("user alredy created");
    }

    const createUser = await User.create({name, email})
    if(!createUser) {
      return res.status(406).json({message:"user creation failed"})
    } else{
      return res.status(200).json({message:createUser})
      // const token = jwt.sign(
      //   { id: newUser._id, isAdmin: newUser.isAdmin },
      //   process.env.JWT_SECRET
      // );
    }
    
  } catch (error) {
    next(error);
  }
};