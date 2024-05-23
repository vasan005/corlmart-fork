import express from "express";
import { createUser } from "../controllers/auth.controller.js";
import { signin } from "../controllers/auth.controller.js";
import { google } from "../controllers/auth.controller.js";
import { getOtp } from "../controllers/auth.controller.js";

const router = express.Router();

//all the functionalities for the routes will be present in respective controller file

//signup route
router.post("/signup", createUser);
//signupasguest
// router.post("/signupasguest", signupasguest);
//signin route
router.post("/signin", signin);
//get OTP
router.post("/getotp",getOtp);
//signinasguest route
// router.post("/signinasguest", signinasguest);
//google
router.post("/google", google);

export default router;
