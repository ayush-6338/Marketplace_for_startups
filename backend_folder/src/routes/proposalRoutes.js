import express from 'express';
import {
  applyToGig,
  getProposalsForGig,
  updateProposalStatus,
} from '../controllers/proposalController.js';

import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

// apply to gig
router.post('/', authMiddleware, applyToGig);

// view proposals for a gig
router.get('/gig/:gigId', authMiddleware, getProposalsForGig);

// accept / reject proposal
router.put('/:id/status', authMiddleware, updateProposalStatus);

export default router;
