import express from "express";
import {
  addOrderItemsController,
  getMyOrdersController,
  getOrderByIdController,
  getOrdersController,
  updateOrderToPaidController,
  updateOrderToDeliveredController,
} from "../controllers/orderController.js";
import { isAdmin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/", protect, isAdmin, getOrdersController);
router.post("/", protect, addOrderItemsController);
router.get("/myorders", protect, getMyOrdersController);
router.get("/:id", protect, getOrderByIdController);
router.put("/:id/pay", protect, updateOrderToPaidController);
router.put("/:id/deliver", protect, isAdmin, updateOrderToDeliveredController);

export default router;
