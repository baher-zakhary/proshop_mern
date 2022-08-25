import express from "express";
import { addOrderItems, getMyOrders, getOrderById, getOrders, updateOrderToDelivered, updateOrderToPaid } from "../controllers/orderController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .post(protect, addOrderItems)
  .get(protect, adminOnly, getOrders)

router.route("/myorders")
  .get(protect, getMyOrders)

router.route("/:id")
  .get(protect, getOrderById) // should be placed under "/" route so it falls back correctly

router.route("/:id/pay")
  .put(protect, updateOrderToPaid)

router.route("/:id/deliver")
  .put(protect, adminOnly, updateOrderToDelivered)

export default router;
