import express from 'express';
const router = express.Router();

import {
  addOrderItems, getOrder, updateOrderToPaid
} from '../controllers/order.js';
import protect from '../middleware/auth.js';

router.route('/').post(protect, addOrderItems);
router.route('/:id').get(protect, getOrder);
router.route('/:id/pay').put(protect, updateOrderToPaid);

export default router;
