const mongoose = require('mongoose');

const patientEngagementSchema = new mongoose.Schema({
  week: {
    type: String,
    required: [true, 'Week is required']
  },
  completions: {
    type: Number,
    required: [true, 'Completions count is required'],
    min: [0, 'Completions cannot be negative']
  },
  change: {
    type: Number,
    default: 0
  },
  city: {
    type: String,
    required: [true, 'City is required']
  },
  language: {
    type: String,
    enum: ['english', 'hindi', 'mixed'],
    required: true
  },
  engagement: {
    type: Number,
    min: [0, 'Engagement cannot be negative'],
    max: [100, 'Engagement cannot exceed 100%']
  },
  asset: {
    name: {
      type: String,
      required: [true, 'Asset name is required']
    },
    type: {
      type: String,
      enum: ['video', 'pdf', 'image'],
      required: true
    },
    language: {
      type: String,
      enum: ['english', 'hindi'],
      required: true
    }
  },
  dwellTime: {
    type: String,
    default: '0 min'
  },
  effectiveness: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    default: 'Medium'
  },
  campaign: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('PatientEngagement', patientEngagementSchema);

