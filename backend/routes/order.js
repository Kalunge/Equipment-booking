import express from 'express';
const router = express.Router();

import {
  addOrderItems,
  getOrder,
  getOrders,
  getUserOrders,
  updateOrderToPaid,
} from '../controllers/order.js';
import { protect, admin } from '../middleware/auth.js';

router.route('/').get(protect, admin, getOrders).post(protect, addOrderItems);
router.route('/myorders').get(protect, getUserOrders);
router.route('/:id').get(protect, getOrder);
router.route('/:id/pay').put(protect, updateOrderToPaid);
export default router;
