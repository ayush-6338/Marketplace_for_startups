import express from 'express';
import {
  createGig,
  getAllGigs,
  getGigById,
  updateGig,
  getMyGigs,
  getTrendingGigs,
} from '../controllers/gigController.js';

import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createGig);
router.get('/', getAllGigs);
router.get('/trending', getTrendingGigs); // Place before /:id
router.get('/my', authMiddleware, getMyGigs);
router.get('/:id', getGigById);
router.put('/:id', authMiddleware, updateGig);

export default router;
