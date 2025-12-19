import User from '../models/User.js';

// GET ALL FREELANCERS
export const getFreelancers = async (req, res) => {
    try {
        const freelancers = await User.find({ role: 'freelancer', isSuspended: false })
            .select('name email role skills rating')
            .sort({ createdAt: -1 });

        res.json(freelancers);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch freelancers' });
    }
};
