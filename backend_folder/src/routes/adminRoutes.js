import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import adminOnly from '../middlewares/adminOnly.js';

import {
  toggleUserSuspend,
  toggleGigHide,
  getAllUsers,
  getAllGigs,
  getDashboardStats, // Preserved
} from '../controllers/adminController.js';

const router = express.Router();

// stats (Preserved)
router.get('/stats', authMiddleware, adminOnly, getDashboardStats);

// users
router.get('/users', authMiddleware, adminOnly, getAllUsers);
router.put('/users/:id/suspend', authMiddleware, adminOnly, toggleUserSuspend);

// gigs
router.get('/gigs', authMiddleware, adminOnly, getAllGigs);
router.put('/gigs/:id/hide', authMiddleware, adminOnly, toggleGigHide);

export default router;
