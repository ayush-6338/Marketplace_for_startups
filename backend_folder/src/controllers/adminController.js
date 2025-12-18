import User from '../models/User.js';
import Startup from '../models/Startup.js';
import Gig from '../models/Gig.js';

/* USER CONTROL */

// suspend / unsuspend user
export const toggleUserSuspend = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.isSuspended = !user.isSuspended;
    await user.save();

    res.json({
      message: `User ${user.isSuspended ? 'suspended' : 'unsuspended'}`,
    });
  } catch {
    res.status(500).json({ message: 'Failed to update user status' });
  }
};

/* STARTUP CONTROL */

// hide / unhide startup
export const toggleStartupVisibility = async (req, res) => {
  try {
    const startup = await Startup.findById(req.params.id);
    if (!startup) return res.status(404).json({ message: 'Startup not found' });

    startup.isHidden = !startup.isHidden;
    await startup.save();

    res.json({
      message: `Startup ${startup.isHidden ? 'hidden' : 'visible'}`,
    });
  } catch {
    res.status(500).json({ message: 'Failed to update startup' });
  }
};

/* GIG CONTROL */

// hide / unhide gig
export const toggleGigVisibility = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return res.status(404).json({ message: 'Gig not found' });

    gig.isHidden = !gig.isHidden;
    await gig.save();

    res.json({
      message: `Gig ${gig.isHidden ? 'hidden' : 'visible'}`,
    });
  } catch {
    res.status(500).json({ message: 'Failed to update gig' });
  }
};
