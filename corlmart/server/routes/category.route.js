import express from "express";
import { verifyUser,verifyTokenAndAdmin } from "../utils/verifyUser.js";
import { createCategory, deleteCategory, getAllCategory, getCategoryById, updateCategory } from "../controllers/category.controller.js";

const router = express.Router();

router.post("/createCategory", verifyTokenAndAdmin, createCategory);
router.get("/getAllCategory", getAllCategory);
router.get("/getCategory/:id",getCategoryById) 
router.delete("/deleteCategory/:categoryId",verifyTokenAndAdmin, deleteCategory);
router.put("/editCategory/:categoryId",verifyTokenAndAdmin, updateCategory);

export default router;
