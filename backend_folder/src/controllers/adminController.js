import User from '../models/User.js';
import Gig from '../models/Gig.js';
import Startup from '../models/Startup.js'; // Preserved for stats

// toggle user suspend / unsuspend
export const toggleUserSuspend = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isSuspended = !user.isSuspended;
    await user.save();

    res.json({
      message: `User ${user.isSuspended ? 'suspended' : 'unsuspended'}`,
      user,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update user' });
  }
};

// toggle gig hide / unhide
export const toggleGigHide = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (!gig) {
      return res.status(404).json({ message: 'Gig not found' });
    }

    gig.isHidden = !gig.isHidden;
    await gig.save();

    res.json({
      message: `Gig ${gig.isHidden ? 'hidden' : 'visible'}`,
      gig,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update gig' });
  }
};

// get all users (admin)
export const getAllUsers = async (req, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });
  res.json(users);
};

// get all gigs (admin)
export const getAllGigs = async (req, res) => {
  const gigs = await Gig.find().sort({ createdAt: -1 });
  res.json(gigs);
};

// get dashboard stats (Preserved for compatibility)
export const getDashboardStats = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const gigs = await Gig.countDocuments();
    const startups = await Startup.countDocuments();

    res.json({
      users,
      gigs,
      startups,
    });
  } catch {
    res.status(500).json({ message: 'Failed to load stats' });
  }
};
