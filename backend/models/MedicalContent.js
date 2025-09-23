const mongoose = require('mongoose');

const medicalContentSchema = new mongoose.Schema({
  medicalName: {
    type: String,
    required: [true, 'Medical name is required'],
    enum: ['diabetes-care', 'foot-care', 'heart-health']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  language: {
    type: String,
    required: [true, 'Language is required'],
    enum: ['english', 'hindi', 'tamil']
  },
  contentFiles: [{
    filename: String,
    originalName: String,
    path: String,
    size: Number,
    mimetype: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  expiryDate: {
    type: Date,
    required: [true, 'Expiry date is required']
  },
  reminderFrequency: {
    type: String,
    enum: ['15d', '30d'],
    default: '30d'
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  approver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  onLabel: {
    type: Boolean,
    default: true
  },
  notes: {
    type: String,
    trim: true
  },
  approvalDate: {
    type: Date
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lastReviewed: {
    type: Date
  },
  reviewReminder: {
    type: Date
  }
}, {
  timestamps: true
});

// Set review reminder before saving
medicalContentSchema.pre('save', function(next) {
  if (this.expiryDate && this.reminderFrequency) {
    const reminderDays = parseInt(this.reminderFrequency.replace('d', ''));
    this.reviewReminder = new Date(this.expiryDate.getTime() - (reminderDays * 24 * 60 * 60 * 1000));
  }
  next();
});

module.exports = mongoose.model('MedicalContent', medicalContentSchema);

