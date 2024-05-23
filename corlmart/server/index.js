import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import categoryRoutes from "./routes/category.route.js";
import cookieParser from "cookie-parser";
import assetRoutes from "./routes/asset.route.js";
import cartRoutes from "./routes/cart.route.js";
import orderRoutes from "./routes/orders.routes.js";
import wishlistRoutes from "./routes/wishlist.route.js";
import feedbackRoutes from "./routes/feedback.route.js";
import paymentRoutes from "./routes/payment.route.js";
import billingRoutes from "./routes/billing.route.js"

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDB is Connected");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome to the Server! 🌐");
});

app.listen(7000, () => {
  console.log("Server is  listening to port 7000!");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/asset", assetRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist",wishlistRoutes);
app.use("/api/orders",orderRoutes);
app.use("/api/payment",paymentRoutes)
app.use("/api/feedback",feedbackRoutes);
app.use("/api/billing",billingRoutes);

//middleware to handle and display errors
app.use((err, req, res, next) => {
  const statusCode = err.statuscode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});


