import Proposal from '../models/Proposal.js';
import Gig from '../models/Gig.js';

// APPLY TO GIG
export const applyToGig = async (req, res) => {
  try {
    const { gigId, message } = req.body;

    if (req.user.role !== 'freelancer') {
      return res.status(403).json({
        message: 'Only freelancers can apply to gigs'
      });
    }

    if (!gigId || !message) {
      return res.status(400).json({ message: 'Gig and message required' });
    }

    const gig = await Gig.findById(gigId);
    if (!gig || gig.isHidden) {
      return res.status(404).json({ message: 'Gig not found' });
    }

    const proposal = await Proposal.create({
      gig: gigId,
      applicant: req.user._id,
      message,
    });

    res.status(201).json({
      message: 'Proposal submitted successfully',
      proposal,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(409)
        .json({ message: 'You already applied to this gig' });
    }

    res.status(500).json({ message: 'Failed to submit proposal' });
  }
};

// GET PROPOSALS FOR A GIG (OWNER ONLY)
export const getProposalsForGig = async (req, res) => {
  try {
    const { gigId } = req.params;

    const proposals = await Proposal.find({ gig: gigId })
      .populate('applicant', 'name email role')
      .sort({ createdAt: -1 });

    res.json(proposals);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch proposals' });
  }
};

// UPDATE PROPOSAL STATUS (ACCEPT / REJECT)
export const updateProposalStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const proposal = await Proposal.findById(req.params.id);
    if (!proposal) {
      return res.status(404).json({ message: 'Proposal not found' });
    }

    proposal.status = status;
    await proposal.save();

    res.json({
      message: 'Proposal status updated',
      proposal,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update proposal' });
  }
};
// GET MY PROPOSALS
export const getMyProposals = async (req, res) => {
  try {
    const proposals = await Proposal.find({ applicant: req.user._id })
      .populate('gig', 'title description price status')
      .sort({ createdAt: -1 });

    res.json(proposals);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch your proposals' });
  }
};
