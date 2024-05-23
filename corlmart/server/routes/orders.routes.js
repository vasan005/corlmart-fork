import express from "express";
import { verifyToken,verifyUser, verifyTokenAndAdmin} from "../utils/verifyUser.js";
import { createOrder } from "../controllers/orders.controller.js";
import { UpdateOrder } from "../controllers/orders.controller.js";
import { getOrdersOfUser } from "../controllers/orders.controller.js";
import { deleteOrder } from "../controllers/orders.controller.js";
import { OrdersOfAllUsers } from "../controllers/orders.controller.js";

const router = express.Router();

router.post("/createOrder",verifyUser, createOrder );
router.put("/:id/updateOrders",verifyUser, UpdateOrder); //id mentioned her is orderId
router.get("/getOrders/:userId",verifyUser,getOrdersOfUser);
router.delete("/deleteOrder/:id",verifyUser,deleteOrder);
router.get("/getAllUsersOrders",verifyTokenAndAdmin, OrdersOfAllUsers);
export default router;
