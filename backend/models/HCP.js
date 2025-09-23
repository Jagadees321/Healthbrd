const mongoose = require('mongoose');

const hcpSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'HCP name is required'],
    trim: true
  },
  specialty: {
    type: String,
    required: [true, 'Specialty is required'],
    enum: ['Endocrinologist', 'Cardiologist', 'General Physician', 'Diabetologist', 'Internal Medicine']
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  shares: {
    type: Number,
    default: 0,
    min: [0, 'Shares cannot be negative']
  },
  engagementScore: {
    type: Number,
    default: 0,
    min: [0, 'Engagement score cannot be negative'],
    max: [10, 'Engagement score cannot exceed 10']
  },
  lastActive: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  },
  campaigns: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign'
  }],
  totalEngagement: {
    views: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    completions: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

// Calculate engagement score before saving
hcpSchema.pre('save', function(next) {
  const total = this.totalEngagement.views + this.totalEngagement.shares + this.totalEngagement.completions;
  if (total > 0) {
    this.engagementScore = Math.round(((this.totalEngagement.shares * 3 + this.totalEngagement.completions * 2 + this.totalEngagement.views) / total) * 10);
  }
  next();
});

module.exports = mongoose.model('HCP', hcpSchema);

