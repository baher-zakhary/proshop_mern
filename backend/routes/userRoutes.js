import express from "express";
import {
  getUserById,
  registerUser,
  updateUser,
  getUsers,
  deleteUser
} from "../controllers/userController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route('/:id')
        .get(protect, getUserById)
        .put(protect, updateUser)
        .delete(protect, adminOnly, deleteUser)
router.route("/")
        .post(registerUser)
        .get(protect, adminOnly, getUsers);

export default router;
