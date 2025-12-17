import mongoose from 'mongoose';

const startupSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    tagline: {
      type: String,
      trim: true,
    },

    description: {
      type: String,
    },

    stage: {
      type: String,
      enum: ['idea', 'prototype', 'revenue'],
      default: 'idea',
    },

    needs: [
      {
        type: String,
      },
    ],

    website: {
      type: String,
    },

    isHidden: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Startup', startupSchema);
