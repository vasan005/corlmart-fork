import express from "express";
import { feedback} from "../controllers/feedback.controller.js";
 
const router = express.Router();
 
 
router.post("/userFeedback", feedback);
 
export default router;