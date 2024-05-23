import express from "express";
import { test } from "../controllers/user.controller.js";
import { verifyToken,verifyUser,verifyTokenAndAdmin } from "../utils/verifyUser.js";
import { deleteUser } from "../controllers/user.controller.js";
import { logout } from "../controllers/user.controller.js";
import { getUsers,getParticularUser } from "../controllers/user.controller.js";
// import { getAllGuestUsers } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/test", test);
//delete account functionality route
router.delete("/delete",verifyUser, deleteUser);
//logout functionality route
router.post("/logout",verifyUser, logout);
//get users information in admin side
router.get("/getusers", verifyTokenAndAdmin, getUsers);
//get particular user
router.get("/getParticularUser", getParticularUser)
//get all guest users
// router.get("/getallguestusers", verifyToken, getAllGuestUsers);

export default router;
