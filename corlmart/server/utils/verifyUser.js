import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import mongoose from "mongoose";
import { errorHandler } from "./error.js";
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(errorHandler(401, "Unauthorized"));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(401, "Unauthorized"));
    }
    req.user = user;
    next();
  });
};

export const verifyUser = async(req,res,next)=>{
  if(!req.headers['authorization']) return res.json({status:406, message:"token required"})
  console.log(req.headers['authorization']);
  const token = req.headers['authorization'].split(" ")[1];
  if (!token) return res.json(401, "invaild token");
  const decoded = jwt.decode(token, process.env.JWT_SECRET)
  const findUser = await User.findOne({_id : decoded?.id})
  req.user = findUser
  if(!findUser) return res.json({status:406, message:"invaild user"})
    next()

  }

 
 
 
export const verifyTokenAndAdmin = async(req, res, next) => {
  if(!req.headers['authorization']) return res.json({status:406, message:"token required"})
  const token = req.headers['authorization'].split(" ")[1];
  if (!token) return res.json(401, "invaild token");
  const decoded = jwt.decode(token, process.env.JWT_SECRET)
  console.log(decoded)
  const findUser = await User.findOne({_id : decoded?.id, isAdmin : true})
  req.user = findUser
  if(!findUser) return res.json({status:406, message:"invaild user"})
  next()
};