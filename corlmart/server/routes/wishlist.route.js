import express from "express";
import { getLikeProducts, getParticularLikeProducts,likeProductToWishList } from "../controllers/wishlist.controller.js";
import { verifyToken, verifyTokenAndAdmin,verifyUser } from "../utils/verifyUser.js";

const router = express.Router();
 
router.post("/likeProduct",verifyUser, likeProductToWishList)
router.get("/getAllLikeProducts",verifyTokenAndAdmin, getLikeProducts)
router.get("/getParticularLikeProducts",verifyUser, getParticularLikeProducts);
export default router;
