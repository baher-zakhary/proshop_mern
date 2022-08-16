import express from "express";
import { getProducts, getProductById, deleteProduct } from "../controllers/productController.js";
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route("/").get(getProducts);

router.route("/:id")
  .get(getProductById)
  .delete(protect, adminOnly, deleteProduct)

export default router;
