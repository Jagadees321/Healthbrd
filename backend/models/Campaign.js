const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Campaign name is required'],
    trim: true
  },
  therapy: {
    type: String,
    required: [true, 'Therapy area is required'],
    enum: ['diabetes', 'hypertension', 'cardiac', 'oncology']
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true
  },
  reach: {
    type: Number,
    required: [true, 'Reach count is required'],
    min: [0, 'Reach cannot be negative']
  },
  shares: {
    type: Number,
    default: 0,
    min: [0, 'Shares cannot be negative']
  },
  completions: {
    count: {
      type: Number,
      default: 0,
      min: [0, 'Completion count cannot be negative']
    },
    rate: {
      type: Number,
      default: 0,
      min: [0, 'Completion rate cannot be negative'],
      max: [100, 'Completion rate cannot exceed 100%']
    }
  },
  status: {
    type: String,
    enum: ['Active', 'Paused', 'Completed', 'Draft'],
    default: 'Draft'
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required']
  },
  contentPack: {
    type: String,
    required: [true, 'Content pack is required'],
    enum: ['video-en', 'video-hi', 'pdf-en', 'pdf-hi']
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  targetAudience: {
    type: String,
    enum: ['patients', 'hcp', 'both'],
    default: 'both'
  },
  language: {
    type: String,
    enum: ['english', 'hindi', 'tamil', 'mixed'],
    default: 'english'
  }
}, {
  timestamps: true
});

// Calculate completion rate before saving
campaignSchema.pre('save', function(next) {
  if (this.reach > 0) {
    this.completions.rate = Math.round((this.completions.count / this.reach) * 100);
  }
  next();
});

module.exports = mongoose.model('Campaign', campaignSchema);

