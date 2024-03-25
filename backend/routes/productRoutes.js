import express from "express";
import {
  getProductById,
  getProducts,
  addProduct,
  getTopProducts,
  addReview,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import checkObjectById from "../middleware/checkObjectById.js";
import { admin, protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, addProduct);
router.route("/top").get(getTopProducts);
router.route("/:id/reviews").post(protect, checkObjectById, addReview);
router
  .route("/:id")
  .get(checkObjectById, getProductById)
  .put(protect, admin, checkObjectById, updateProduct)
  .delete(protect, admin, checkObjectById, deleteProduct);

export default router;
