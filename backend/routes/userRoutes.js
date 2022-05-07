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

router.route("/:id").get(protect, getUserById)
router.route("/")
        .post(registerUser)
        .put(protect, updateUser)
        .get(protect, adminOnly, getUsers);
router.route('/:id').delete(protect, adminOnly, deleteUser)

export default router;
