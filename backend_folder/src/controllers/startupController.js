import Startup from '../models/Startup.js';

// CREATE STARTUP
export const createStartup = async (req, res) => {
  try {
    const { name, tagline, description, stage, needs, website } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Startup name is required' });
    }

    const startup = await Startup.create({
      owner: req.user._id,
      name,
      tagline,
      description,
      stage,
      needs,
      website,
    });

    res.status(201).json({
      message: 'Startup created successfully',
      startup,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create startup' });
  }
};

// GET ALL STARTUPS
export const getAllStartups = async (req, res) => {
  try {
    const startups = await Startup.find({ isHidden: false })
      .populate('owner', 'name email role')
      .sort({ createdAt: -1 });

    res.json(startups);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch startups' });
  }
};

// GET SINGLE STARTUP
export const getStartupById = async (req, res) => {
  try {
    const startup = await Startup.findById(req.params.id)
      .populate('owner', 'name email role');

    if (!startup || startup.isHidden) {
      return res.status(404).json({ message: 'Startup not found' });
    }

    res.json(startup);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch startup' });
  }
};

// UPDATE STARTUP (OWNER ONLY)
export const updateStartup = async (req, res) => {
  try {
    const startup = await Startup.findById(req.params.id);

    if (!startup) {
      return res.status(404).json({ message: 'Startup not found' });
    }

    if (startup.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    Object.assign(startup, req.body);
    await startup.save();

    res.json({
      message: 'Startup updated successfully',
      startup,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update startup' });
  }
};
