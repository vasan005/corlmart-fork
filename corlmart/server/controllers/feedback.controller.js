import { errorHandler } from "../utils/error.js";
import nodemailer from "nodemailer";
 
export const feedback = async (req,res,next)=>{
const {name,email,phone,feedback_text}= req.body
 
try{
    if (!name||!email||!phone||!feedback_text){
        return next (errorHandler(400,"All fields are required"));
    }
const transporter= nodemailer.createTransport({
service:'gmail',
auth:{
    user:process.env.SMTP_USER,
    pass:process.env.SMTP_PASS
}
});
 
 
let mailOptions={
    from:`${email}`,
    to:"kavipriya2912002@gmail.com",
    subject:"Got a feedback from "+name,
 
    html:`<h2>Got a message</h2>
    <h3>From:${name}</h3>
    <p>${email}</p>
    <p>${phone}</p>
    <p>${feedback_text}</p>`
};
 
 
transporter.sendMail(mailOptions)  
return res.status(200).json("Feedback Send Succesfully");
}
catch(error){
next(error)
}};
 