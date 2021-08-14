import express from 'express';
const router = express.Router();

import { login, signUp, getProfile } from '../controllers/user.js';
import protect from '../middleware/auth.js';

router.post('/login', login);
router.route('/profile').get(protect, getProfile);
router.route('/').post(signUp)

export default router;
