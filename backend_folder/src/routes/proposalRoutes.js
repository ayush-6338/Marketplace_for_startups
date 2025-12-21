import express from 'express';
import {
  applyToGig,
  getProposalsForGig,
  updateProposalStatus,
  getMyProposals,
} from '../controllers/proposalController.js';

import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// get my proposals
router.get('/my', authMiddleware, getMyProposals);

// apply to gig
router.post('/', authMiddleware, applyToGig);

// view proposals for a gig
router.get('/gig/:gigId', authMiddleware, getProposalsForGig);

// accept / reject proposal
router.put('/:id/status', authMiddleware, updateProposalStatus);

export default router;
