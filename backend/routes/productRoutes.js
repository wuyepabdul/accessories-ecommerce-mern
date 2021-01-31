import express from "express";
import {
  createProductController,
  createProductReviewController,
  deleteProductController,
  getProductById,
  getProductsController,
  getTopProducts,
  updateProductController,
} from "../controllers/productController.js";
import { isAdmin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// @desc Fetch all products
// @route Get /api/products
// @access Public

router.get("/", getProductsController);
router.get("/top", getTopProducts);
router.post("/", protect, isAdmin, createProductController);

router.post("/:productId/reviews", protect, createProductReviewController);

// @desc Fetch a single product
// @route Get /api/products/:id
// @access Public

router.get("/:productId", getProductById);
router.put("/:productId", protect, isAdmin, updateProductController);
router.delete("/:productId", protect, isAdmin, deleteProductController);

export default router;
