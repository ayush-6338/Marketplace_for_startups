import express from 'express';
import authMiddleware from '../middlewares/auth.js';
import adminOnly from '../middlewares/adminOnly.js';
import {
  toggleUserSuspend,
  toggleStartupVisibility,
  toggleGigVisibility,
} from '../controllers/adminController.js';

const router = express.Router();

// user moderation
router.put('/users/:id/suspend', authMiddleware, adminOnly, toggleUserSuspend);

// startup moderation
router.put('/startups/:id/hide', authMiddleware, adminOnly, toggleStartupVisibility);

// gig moderation
router.put('/gigs/:id/hide', authMiddleware, adminOnly, toggleGigVisibility);

export default router;
