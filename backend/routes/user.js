import express from 'express';
const router = express.Router();

import {
  login,
  signUp,
  getProfile,
  updateProfile,
  getusers,
  deleteUser,
  getuserbyId,
  updateUser,
} from '../controllers/user.js';
import { protect, admin } from '../middleware/auth.js';

router.post('/login', login);
router.route('/profile').get(protect, getProfile).put(protect, updateProfile);
router.route('/').post(signUp).get(protect, admin, getusers);
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getuserbyId)
  .put(protect, admin, updateUser);

export default router;
