import Asset from "../models/asset.model.js";
import mongoose from "mongoose";
import constantValue from "../utils/const.js";
import wishList from "../models/wishlist.model.js";
 
 
export const likeProductToWishList = async (req, res) => {
    try {
       if(req?.body?.isLike == constantValue.LIKE){
        const findLike = await wishList.findOne(req?.body)
        if(findLike) return res.json({message:"alredy liked"})
            const createWishList = await wishList.create(req?.body)
            if(createWishList){
                return res.status(200).json({messsage:"whisList Created"})
               
            }else{
                return res.status(406).json({message:"createWishList failed"})
            }
        }else if(req?.body?.isLike == constantValue.UNLIKE){
            const removeWishList = await wishList.deleteOne({productId:req?.body?.productId, userId:req?.body?.userId})
            if(removeWishList){
                return res.json({message:"whishList Removed"})
            }else{
                return res.status(406).json({message:"whishList Removed failed"})
            }
        }
       }
    catch (err) {
        return res.status(500).json({ status: 500, message: err.message });
    }
}

export const getLikeProducts = async(req, res) => {
 
    const getAllLikeProducts = await wishList.find({isLike : true})
    if(getAllLikeProducts){
       return res.json({status:200, getAllLikeProducts})
    }else{
        return res.status(500).json({status:406, message:"something went wrong"})
    }
 
}
 
 
export const getParticularLikeProducts = async (req, res) => {
    if (!req.query.id) {
        return res.status(406).json({ message: "ID required" });
    }
 
    try {
        const likedProducts = await wishList.find({ userId: req.query.id, isLike: true }).populate('productId').exec();
 
        if (likedProducts && likedProducts.length > 0) {
            return res.json(likedProducts);
        } else {
            return res.status(404).json({ message: "No liked products found" });
        }
    } catch (error) {
        console.error('Error fetching liked products:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
};