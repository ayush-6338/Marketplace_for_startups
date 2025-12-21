import Gig from '../models/Gig.js';
import User from '../models/User.js';
import Notification from '../models/Notification.js';

// CREATE GIG
export const createGig = async (req, res) => {
  try {
    const { title, description, category, price, deliveryDays, tags } = req.body;

    if (!['client', 'startup'].includes(req.user.role)) {
      return res.status(403).json({
        message: 'Only clients or startups can create gigs'
      });
    }

    if (!title || !description || !category || !price || !deliveryDays) {
      return res.status(400).json({ message: 'All required fields missing' });
    }

    const gig = await Gig.create({
      owner: req.user._id,
      title,
      description,
      category,
      price,
      deliveryDays,
      tags,
    });

    // NOTIFICATION: Notify all freelancers
    // WARNING: This is a broadcast. For larger apps, use background jobs.
    const freelancers = await User.find({ role: 'freelancer' });
    const notifications = freelancers.map(f => ({
      recipient: f._id,
      message: `New gig posted: ${title}`,
      type: 'new_gig',
      relatedId: gig._id
    }));
    await Notification.insertMany(notifications);

    res.status(201).json({
      message: 'Gig created successfully',
      gig,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create gig' });
  }
};

// GET ALL GIGS
export const getAllGigs = async (req, res) => {
  try {
    const filter = { isHidden: false };
    if (req.query.category) {
      filter.category = req.query.category;
    }

    const gigs = await Gig.find(filter)
      .populate('owner', 'name email role')
      .sort({ createdAt: -1 });

    res.json(gigs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch gigs' });
  }
};

// GET SINGLE GIG
export const getGigById = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id)
      .populate('owner', 'name email role');

    if (!gig || gig.isHidden) {
      return res.status(404).json({ message: 'Gig not found' });
    }

    res.json(gig);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch gig' });
  }
};

// UPDATE GIG (OWNER ONLY)
export const updateGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (!gig) {
      return res.status(404).json({ message: 'Gig not found' });
    }

    if (gig.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    Object.assign(gig, req.body);
    await gig.save();

    res.json({
      message: 'Gig updated successfully',
      gig,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update gig' });
  }
};
// GET MY GIGS
export const getMyGigs = async (req, res) => {
  try {
    const gigs = await Gig.aggregate([
      // 1. Match gigs owned by the user
      { $match: { owner: req.user._id } },

      // 2. Lookup proposals for each gig
      {
        $lookup: {
          from: 'proposals',
          localField: '_id',
          foreignField: 'gig',
          as: 'proposals'
        }
      },

      // 3. Add proposalCount field
      {
        $addFields: {
          proposalCount: { $size: '$proposals' }
        }
      },

      // 4. Sort by newest first
      { $sort: { createdAt: -1 } },

      // 5. Project fields (optional, but good for cleanup) - keeping it simple for now to return full doc + count
    ]);

    res.json(gigs);
  } catch (error) {
    console.error('Get My Gigs Error:', error);
    res.status(500).json({ message: 'Failed to fetch your gigs' });
  }
};

// GET TRENDING GIGS
export const getTrendingGigs = async (req, res) => {
  try {
    // group gigs by category and count
    const result = await Gig.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]);

    if (result.length === 0) {
      return res.json({ category: null, gigs: [] });
    }

    const topCategory = result[0]._id;

    // fetch gigs from that category
    const gigs = await Gig.find({ category: topCategory, isHidden: false })
      .populate('owner', 'name email role')
      .sort({ createdAt: -1 })
      .limit(4);

    res.json({
      category: topCategory,
      gigs
    });

  } catch (error) {
    console.error('Trending Error:', error);
    res.status(500).json({ message: 'Failed to load trending gigs' });
  }
};
