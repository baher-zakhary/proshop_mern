import express from "express";
import { getProducts, getProductById, deleteProduct, createProduct, updateProduct, createProductReview } from "../controllers/productController.js";
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route("/")
  .get(getProducts)
  .post(protect, adminOnly, createProduct);

router.route("/:id")
  .get(getProductById)
  .delete(protect, adminOnly, deleteProduct)
  .put(protect, adminOnly, updateProduct)

router.route("/:id/reviews")
  .post(protect, createProductReview)

export default router;
