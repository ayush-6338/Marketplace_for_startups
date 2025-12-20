import express from 'express';
import { getFreelancers, getFavorites, toggleFavorite, getMyProfile, updateProfile, getUserById } from '../controllers/userController.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

router.get('/freelancers', authMiddleware, getFreelancers);
router.get('/favorites', authMiddleware, getFavorites);
router.post('/favorites/toggle', authMiddleware, toggleFavorite);

router.get('/me', authMiddleware, getMyProfile);
router.put('/me', authMiddleware, updateProfile);
router.get('/:id', authMiddleware, getUserById);

export default router;
