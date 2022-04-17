import express from "express";
import {
  getUserProfile,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/profile").get(protect, getUserProfile);
router.route("/")
        .post(registerUser)
        .put(protect, updateUserProfile);

export default router;
