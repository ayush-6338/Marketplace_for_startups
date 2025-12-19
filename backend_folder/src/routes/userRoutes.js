import express from 'express';
import { getFreelancers } from '../controllers/userController.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

router.get('/freelancers', authMiddleware, getFreelancers);

export default router;
