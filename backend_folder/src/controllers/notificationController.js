import Notification from '../models/Notification.js';

// GET MY NOTIFICATIONS
export const getMyNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ recipient: req.user._id })
            .sort({ createdAt: -1 })
            .limit(50); // Limit to last 50 to avoid overload

        const unreadCount = await Notification.countDocuments({
            recipient: req.user._id,
            isRead: false,
        });

        res.json({ notifications, unreadCount });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch notifications' });
    }
};

// MARK AS READ
export const markNotificationAsRead = async (req, res) => {
    try {
        const { id } = req.params;

        if (id === 'all') {
            await Notification.updateMany(
                { recipient: req.user._id, isRead: false },
                { isRead: true }
            );
            return res.json({ message: 'All notifications marked as read' });
        }

        const notification = await Notification.findById(id);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        if (notification.recipient.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        notification.isRead = true;
        await notification.save();

        res.json({ message: 'Notification marked as read', notification });
    } catch (error) {
        res.status(500).json({ message: 'Failed to mark notification' });
    }
};
