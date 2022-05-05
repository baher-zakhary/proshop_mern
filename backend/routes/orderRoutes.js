import express from "express";
import { addOrderItems, getMyOrders, getOrderById, updateOrderToPaid } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, addOrderItems)
router.route("/myorders").get(protect, getMyOrders)
router.route("/:id").get(protect, getOrderById) // should be placed under "/" route so it falls back correctly
router.route("/:id/pay").put(protect, updateOrderToPaid)

export default router;
