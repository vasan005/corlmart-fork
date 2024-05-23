import mongoose from "mongoose";
import Asset from "./asset.model.js";
const wishlistSchema = new mongoose.Schema(
  {
    userId: {
        type: String,
        required: true,
    },
    productId: {
        type: String,
        ref: 'Asset',
      },
    isLike:{
      type:Boolean,
      default:false
     
    },
  },
);
 
const wishList = mongoose.model("wishlist", wishlistSchema);
 
export default wishList;