import express from 'express';
const router = express.Router();
import { protect, admin } from '../middleware/auth.js';
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
  addReview,
  getTopProducts,
} from '../controllers/product.js';

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/:id/reviews').post(protect, addReview);
router.get('/top', getTopProducts);
router
  .route('/:id')
  .get(getProduct)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;
