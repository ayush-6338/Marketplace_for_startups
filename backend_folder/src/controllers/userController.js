import User from '../models/User.js';

const allowedProfileFields = [
    'name',
    'avatar',
    'bio',
    'location',
    'skills',
    'experience',
    'portfolio',
    'companyName',
    'industry',
    'teamSize',
    'website',
];

const buildProfileUpdate = (body) => {
    const update = {};

    allowedProfileFields.forEach((field) => {
        if (Object.prototype.hasOwnProperty.call(body, field)) {
            update[field] = body[field];
        }
    });

    if (typeof update.avatar === 'string') {
        const isDataImage = /^data:image\/(jpeg|jpg|png|webp);base64,/.test(update.avatar);
        const isHttpImage = /^https?:\/\/.+/i.test(update.avatar);

        if (update.avatar && !isDataImage && !isHttpImage) {
            const error = new Error('Invalid avatar image');
            error.statusCode = 400;
            throw error;
        }

        if (update.avatar.length > 1_000_000) {
            const error = new Error('Avatar image is too large');
            error.statusCode = 400;
            throw error;
        }
    }

    return update;
};

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

// GET FAVORITES
export const getFavorites = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .populate('favoriteFreelancers')
            .populate('savedGigs'); // will populate full gig details

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (req.user.role === 'freelancer') {
            res.json(user.savedGigs);
        } else {
            res.json(user.favoriteFreelancers);
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch favorites' });
    }
};

// TOGGLE FAVORITE
export const toggleFavorite = async (req, res) => {
    try {
        const { id } = req.body; // ID of freelancer or gig
        const user = await User.findById(req.user._id);

        if (req.user.role === 'freelancer') {
            // Toggle Gig
            const index = user.savedGigs.indexOf(id);
            if (index === -1) {
                user.savedGigs.push(id);
            } else {
                user.savedGigs.splice(index, 1);
            }
        } else { // client or startup
            // Toggle Freelancer
            const index = user.favoriteFreelancers.indexOf(id);
            if (index === -1) {
                user.favoriteFreelancers.push(id);
            } else {
                user.favoriteFreelancers.splice(index, 1);
            }
        }

        await user.save();
        res.json({ message: 'Favorites updated', favorites: req.user.role === 'freelancer' ? user.savedGigs : user.favoriteFreelancers });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update favorites' });
    }
};

// GET MY PROFILE
export const getMyProfile = (req, res) => {
    res.json(req.user);
};

// UPDATE PROFILE
export const updateProfile = async (req, res) => {
    try {
        const profileUpdate = buildProfileUpdate(req.body);
        const user = await User.findByIdAndUpdate(
            req.user._id,
            profileUpdate,
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        if (error.statusCode) {
            return res.status(error.statusCode).json({ message: error.message });
        }

        res.status(500).json({ message: 'Failed to update profile' });
    }
};

// GET PUBLIC PROFILE BY ID
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password -savedGigs -favoriteFreelancers');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch user profile' });
    }
};
