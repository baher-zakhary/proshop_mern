import express from "express"
import { getPaypalConfig } from "../controllers/paypalController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router()

router.route('/config').get(protect, getPaypalConfig)

export default router;
