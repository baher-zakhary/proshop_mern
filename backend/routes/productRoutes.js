import express from "express";
import { getProducts, getProductById, deleteProduct, createProduct, updateProduct } from "../controllers/productController.js";
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route("/")
  .get(getProducts)
  .post(protect, adminOnly, createProduct);

router.route("/:id")
  .get(getProductById)
  .delete(protect, adminOnly, deleteProduct)
  .put(protect, adminOnly, updateProduct)

export default router;
