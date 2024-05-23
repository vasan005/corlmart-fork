// import mongoose from 'mongoose';
// import Category from './category.model.js';
 
// const assetSchema = new mongoose.Schema({
//   assetName: { type: String, required: true },
//   assetID:{type:Number, required:true},
//   price: { type: String, required: true },
//   description: { type: String, required: true },  
//   quads:{type: Number, required:true},
//  totaltriangles:{type:Number, required:true},
//   vertices: {type: Number,required:true},
//   materials: {type: Number,required:true},
//   rigged: {type:String,required:true},
//   fileFormats: {type:Array, required: true},
  
//   category:{type: mongoose.Schema.Types.ObjectId,
//     ref:Category ,
//     required: true, },
//   files: [
//     {
//       name:{type: String, required: true},
//       type: { type: String, required: true },
//       format: { type: String, required: true },
//       size: { type: String, required: true },  
//       url: { type: String, required: true },
//       key:{type:String, required:true}
//     }
//   ]
 
// });
 
// const Asset = mongoose.model('Asset', assetSchema);
 
// export default Asset;

import mongoose from 'mongoose';
import Category from './category.model.js';
 
const assetSchema = new mongoose.Schema({
  assetName: { type: String, required: true },
  assetID:{type:Number, required:true},
  price: { type: String, required: true },
  description: { type: String, required: true },  
  quads:{type: Number, required:true},
 totalTriangles:{type:Number, required:true},
  vertices: {type: Number,required:true},
  materials: {type: Number,required:true},
  rigged: {type:Boolean,required:true},
  totalFileSize:{type:String,required:true},
  fileFormats:{type: Array,required:true},
  signedImageUrl:{type:String},
  category:{type: mongoose.Schema.Types.ObjectId,
    ref:Category ,
    required: true, },
  files: [
    {
      name:{type: String, required: true},
      type: { type: String, required: true },
      format: { type: String, required: true },
      size: { type: String, required: true },  
      url: { type: String, required: true },
      key:{type:String, required:true}
    }
  ]
 
});
 
const Asset = mongoose.model('Asset', assetSchema);
 
export default Asset;