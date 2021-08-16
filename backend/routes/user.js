import express from 'express';
const router = express.Router();

import { login, signUp, getProfile, updateProfile } from '../controllers/user.js';
import protect from '../middleware/auth.js';

router.post('/login', login);
router.route('/profile').get(protect, getProfile).put(protect, updateProfile)
router.route('/').post(signUp)

export default router;
