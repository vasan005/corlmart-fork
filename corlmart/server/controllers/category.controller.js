import Category from "../models/category.model.js";
import { errorHandler } from "../utils/error.js";
import multer from "multer";
import multerS3 from "multer-s3";
import mongoose from "mongoose";
import { deleteFileFromS3, generateS3FileUrl, getSignedUrl, s3 } from "../utils/s3UploadClient.js";
 
 
 
 
 
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.WASABI_BUCKET,
    key: function (req, file, cb) {
      const folderName = 'CategoryImages';
      const filename = `${folderName}/${Date.now().toString() + '-' + file.originalname}`;
      cb(null, filename);
    }
  }),
  fileFilter:function(req,file,cb){
    if(file.fieldname==='image'|| file.fieldname==='icon'){
      cb(null,true);
    }else{
      cb(new Error("invalid field name"))
    }
  }
 
 
});
 
 
// Create Category
export const createCategory = async (req, res, next) => {
  try {
   
   
    upload.fields([{ name: 'image', maxCount: 1 }, { name: 'icon', maxCount: 1 }])(req, res, async function (error) {
      if (error) {
        console.error('Error uploading image:', error);
        return res.status(500).json({ error: 'Failed to upload image' });
      }
 
      const  categoryName  = req.body.categoryName;
      console.log(categoryName);
         if (!categoryName) {
           return res.status(400).json({ error: 'Category name is required.' });
         }
      const imageFiles = req.files['image'];
      const iconFiles = req.files['icon'];
 console.log(imageFiles,iconFiles);
      if (!imageFiles || !iconFiles) {
        return res.status(400).json({ error: 'Both image and icon files are required.' });
      }
 
      const imageKey = imageFiles[0].key;
      const iconKey = iconFiles[0].key;
     
 
      const newCategory = new Category({
        categoryName,
        imageKey,
        iconKey
       
      });
 
      const savedCategory = await newCategory.save();
 
      res.status(201).json(savedCategory);
    });
  } catch (error) {
    console.error('Error creating category:', error);
    next(errorHandler(error));
  }
};
 
//Get all category
 
// Get all categories
export const getAllCategory = async (req, res, next) => {
  try {
    const allCategories = await Category.find({});
 
    const categoriesWithUrls = await Promise.all(
      allCategories.map(async (category) => {
        const imageUrl = await getSignedUrl(category.imageKey);
        const iconUrl = await getSignedUrl(category.iconKey);
        return {
          _id: category._id,
          categoryName: category.categoryName,
          imageUrl,
          iconUrl,
          // include other category metadata here if there are any
        };
      })
    );
 
    res.status(200).json({ allCategories: categoriesWithUrls });
  } catch (error) {
    console.error('Error fetching categories:', error);
    next(errorHandler(error));
  }
};
 
 
 
 
// Delete Category
 
export const deleteCategory = async (req, res, next) => {
  try {
    const {categoryId} = req.params;
    if (!categoryId) {
      return res.status(400).json({ error: 'Category ID is required.' });
    }
 
    // Find the category to delete
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ error: 'Category not found.' });
    }
 
    // Delete associated files from S3 if they exist
    if (category.imageKey) {
      await deleteFileFromS3(category.imageKey);
    }
 
    if (category.iconKey) {
      await deleteFileFromS3(category.iconKey);
    }
 
    // Delete the category from the database
    await Category.findByIdAndDelete(categoryId);
 
    res.status(200).json({ message: 'Category deleted successfully.' });
  } catch (error) {
    console.error('Error deleting category:', error);
    next(errorHandler(error));
  }
};
 
 
 
// Update Category
export const updateCategory = async (req, res, next) => {
  try {
    upload.fields([{ name: 'image', maxCount: 1 }, { name: 'icon', maxCount: 1 }])(req, res, async function (error) {
      if (error) {
        console.error('Error uploading files:', error);
        return res.status(500).json({ error: 'Failed to upload files' });
      }
 
      const { categoryName } = req.body;
      const {categoryId}=req.params;
 
      if (!categoryId || !categoryName) {
        return res.status(400).json({ error: 'Category ID and name are required.' });
      }
 
      let category = await Category.findById(categoryId);
      if (!category) {
        return res.status(404).json({ error: 'Category not found.' });
      }
 
      // Delete existing files if new files are uploaded
      if (req.files['image'] && category.imageKey) {
        await deleteFileFromS3(category.imageKey);
        category.imageKey = null;
      }
 
      if (req.files['icon'] && category.iconKey) {
        await deleteFileFromS3(category.iconKey);
        category.iconKey = null;
      }
 
      // Update category properties
      category.categoryName = categoryName;
 
      // Check if new image file was uploaded
      if (req.files['image']) {
        const imageKey = req.files['image'][0].key;
        category.imageKey = imageKey;
      }
 
      // Check if new icon file was uploaded
      if (req.files['icon']) {
        const iconKey = req.files['icon'][0].key;
        category.iconKey = iconKey;
      }
 
      // Save the updated category
      const updatedCategory = await category.save();
 
      res.status(200).json(updatedCategory);
    });
  } catch (error) {
    console.error('Error updating category:', error);
    next(errorHandler(error));
  }
};
 
 
 
// Get single category
export const getCategoryById = async(req,res,next)=>{
  const category = await Category.findById({_id: new mongoose.Types.ObjectId(req.params.id)});
  if(!category){
    res.status(500).json({message: 'Category with the given id was not exist'});
  }
  res.status(200).send(category);
 
}