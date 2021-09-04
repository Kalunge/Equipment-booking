import express from 'express';
const router = express.Router();

import {
  addOrderItems,
  getOrder,
  getOrders,
  getUserOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
} from '../controllers/order.js';
import { protect, admin } from '../middleware/auth.js';

router.route('/').get(protect, admin, getOrders).post(protect, addOrderItems);
router.route('/myorders').get(protect, getUserOrders);
router.route('/:id').get(protect, getOrder);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);
export default router;
