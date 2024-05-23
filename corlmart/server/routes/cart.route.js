import express from "express";
import { verifyToken,verifyTokenAndAdmin,verifyUser} from "../utils/verifyUser.js";
import { UpdateCart, createCart, getUserCart,RemoveItemFromCart,GetAllUsersCart } from "../controllers/cart.controller.js";


const router = express.Router();

router.post("/createCart",verifyUser, createCart);
router.put("/updateCart/:id",verifyUser,UpdateCart);//cart ID should replace id in api
router.get("/getUserCart",getUserCart);
router.get("/getAllUsersCart",verifyTokenAndAdmin,verifyToken,GetAllUsersCart);
router.delete("/RemoveItemFromCart",verifyUser,RemoveItemFromCart);

export default router;

