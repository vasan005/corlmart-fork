import express from "express";
import { verifyToken,verifyTokenAndAdmin,verifyUser} from "../utils/verifyUser.js";
import { createBilling , getBilling} from "../controllers/billing.controller.js";
 
const router = express.Router();
router.post("/createBilling", createBilling);
router.get("/getBilling", getBilling);
 
export default router;