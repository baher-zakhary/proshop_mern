import express from "express";
import {
  getUserById,
  registerUser,
  updateUser
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/:id").get(protect, getUserById)
router.route("/")
        .post(registerUser)
        .put(protect, updateUser);

export default router;
