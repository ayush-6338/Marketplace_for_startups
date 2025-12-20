import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import {
    getMyNotifications,
    markNotificationAsRead,
} from '../controllers/notificationController.js';

const router = express.Router();

router.use(protect);

router.get('/', getMyNotifications);
router.put('/:id/read', markNotificationAsRead);

export default router;
