import express from 'express';
import {
  createStartup,
  getAllStartups,
  getStartupById,
  updateStartup,
} from '../controllers/startupController.js';

import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

router.post('/', authMiddleware, createStartup);
router.get('/', getAllStartups);
router.get('/:id', getStartupById);
router.put('/:id', authMiddleware, updateStartup);

export default router;
