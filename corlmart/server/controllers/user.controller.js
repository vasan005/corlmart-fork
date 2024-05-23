// import bcryptjs from "bcryptjs";
import mongoose from "mongoose";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
// import { parse } from "dotenv";
// import UserAsGuest from "../models/userasguest.model.js";

export const test = (req, res) => {
  res.json({ message: " API is working!" });
};

//delete account functionality

export const deleteUser = async (req, res, next) => {
// return res.json(1232)
  try {
    // console.log("id", req?.user?._id)
    const findUser = await User.findOne({_id : req?.user?._id})
    if(findUser){
     const userDelete = await User.deleteOne({_id:new mongoose.Types.ObjectId(findUser?._id)})
     if(userDelete){
       return res.json({status:200, message:"account has been deleted"})
     }else{
       return res.json({status:406, message:"account deleted failed"})
     }
    }
    
  } catch (err) {
    return res.json({message:err.message})
  }
 
 };


//logout functionality
export const logout = (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json("User has been signed out");
  } catch (error) {
    next(error);
  }
};

//get particular user
export const getParticularUser = async(req, res)=>{
  try {
  
    const findUser = await User.findOne({_id : req?.query?.id, verifiedEmail : true, })
  if(!findUser) return res.json({status:406, message:"invaild user id"})
  return res.status(200).json({status:200, message:{
    _id:findUser?._id,
    name:findUser?.name,
    email:findUser?.email,
    phone:findUser?.phone,
    verifiedEmail:findUser?.verifiedEmail,
    isActive:findUser?.isActive
}})
  } catch (err) {
    return res.status(406).json({status:406, message:err.message})
  }
 
}




//get all users
export const getUsers = async (req, res, next) => {
  // if (!req.user.isAdmin) {
  //   return next(errorHandler(403, "You are not allowed to see all users"));
  // }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;

    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const usersWithoutPassword = users.map((user) => {
      const { password, confirmpassword, ...rest } = user._doc;
      return rest;
    });

    const totalUsers = await User.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

   res.status(200).json({
      users: usersWithoutPassword,
      totalUsers,
      lastMonthUsers,
    });
  } catch (error) {
    next(error);
  }
};

//get all guest users

// export const getAllGuestUsers = async (req, res, next) => {
//   if (!req.user.isAdmin) {
//     return next(errorHandler(403, "You are not allowed to see all users"));
//   }
//   try {
//     const startIndex = parseInt(req.query.startIndex) || 0;
//     const limit = parseInt(req.query.limit) || 9;
//     const sortDirection = req.query.sort === "asc" ? 1 : -1;

//     const guestusers = await UserAsGuest.find()
//       .sort({ createdAt: sortDirection })
//       .skip(startIndex)
//       .limit(limit);

//     const usersWithoutPassword = guestusers.map((user) => {
//       const { name, phone } = user._doc;
//       return { name, phone };
//     });

//     const totalGuestUsers = await UserAsGuest.countDocuments();

//     const now = new Date();

//     const oneMonthAgo = new Date(
//       now.getFullYear(),
//       now.getMonth() - 1,
//       now.getDate()
//     );
//     const lastMonthGuestUsers = await UserAsGuest.countDocuments({
//       createdAt: { $gte: oneMonthAgo },
//     });

//     res.status(200).json({
//       users: usersWithoutPassword,
//       totalGuestUsers,
//       lastMonthGuestUsers,
//     });
//   } catch (error) {
//     next(error);
//   }
// };
