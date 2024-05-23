import Cart from '../models/cart.model.js'
import Asset from "../models/asset.model.js"
import mongoose from 'mongoose';
import User from '../models/user.model.js';


//create cart
export const createCart = async (req, res) => {
  try {
    // const { body } = req;
    const body = req?.body
    console.log(body)
    const existingCart = await Cart.findOne(body);
 
 
    if (existingCart) {
      return res.status(406).json({ message: "Cart already created" });
    }
 
    const findProducts = await Asset.findById(req.body.productId);
    if (!findProducts) {
      return res.status(406).json({ message: "Invalid productId" });
    }
 
    const newCart = await Cart.create(body);
    if (!newCart) {
      return res.status(406).json({ message: "Failed to create cart" });
    }
 
    const cartDetails = await Asset.find({_id:new mongoose.Types.ObjectId(req?.body?.productId)})
    if (newCart) {
      return res.status(200).json({
        message: "Cart created successfully",
        findProducts
      });
    } else {
      return res.status(406).json({ message: "Cart details fetch failed" });
    }
  } catch (error) {
    console.error('Error creating cart:', error);
    return res.status(500).json({ message: "Server error" });
  }
};

//update cart

export const UpdateCart = async (req,res,next)=>{
try {
    const updatedCart = await Cart.findByIdAndUpdate(
        req.params.id,{$set: req.body,},{new: true}
    );
    return res.status(200).json(updatedCart);
} catch (error) {
    return res.status(500).json(err);
}
}


//get user cart

export const getUserCart= async (req,res,next)=>{
  try {
      const cart = await Cart.find({ userId: req.query.userId }).populate('productId').exec();
      return res.status(200).json(cart);
      
    } catch (err) {
      returnres.status(500).json(err);
    }
}

//delete particular item from cart

export const RemoveItemFromCart = async (req,res,next)=>{
    try {
        await Cart.deleteOne({productId : req?.body?.productId});
        res.status(200).json("Cart has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
}

//get All carts of all users

export const GetAllUsersCart= async (req,res,next)=>{
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
      } catch (err) {
        res.status(500).json(err);
      }
}