import express from "express";
import { verifyToken,verifyUser, verifyTokenAndAdmin} from "../utils/verifyUser.js";
import { RazorOrder,RazorValidate ,getAllPaymentDetails, getParticularPurchaseHistory} from "../controllers/payment.controller.js";
const router = express.Router();

router.post("/order",RazorOrder );
router.post("/ordervalidate",RazorValidate);
router.get("/getAllPurchaseHistory",verifyTokenAndAdmin,getAllPaymentDetails);
router.get("/getParticularUserHistory",verifyUser,getParticularPurchaseHistory);
export default router;
