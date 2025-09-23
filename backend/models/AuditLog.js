const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  contentId: {
    type: String,
    required: [true, 'Content ID is required']
  },
  approver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  action: {
    type: String,
    required: [true, 'Action is required'],
    enum: ['Approved', 'Rejected', 'Created', 'Updated', 'Deleted']
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Active', 'Rejected', 'Pending'],
    required: true
  },
  notes: {
    type: String,
    trim: true
  },
  previousStatus: {
    type: String
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('AuditLog', auditLogSchema);

