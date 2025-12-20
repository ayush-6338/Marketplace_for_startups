import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
    {
        recipient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        isRead: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            enum: ['application', 'new_gig', 'info'], // added 'info' just in case
            required: true,
        },
        relatedId: {
            type: mongoose.Schema.Types.ObjectId,
            // Can reference Gig or Proposal depending on context, or null
            required: false,
        },
    },
    { timestamps: true }
);

export default mongoose.model('Notification', notificationSchema);
