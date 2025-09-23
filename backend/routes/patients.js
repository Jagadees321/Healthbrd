const express = require('express');
const { auth } = require('../middleware/auth');
const PatientEngagement = require('../models/PatientEngagement');

const router = express.Router();

// @route   GET /api/patients
// @desc    Get all patient engagement data
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const patientEngagement = await PatientEngagement.find().populate('createdBy', 'firstName lastName email');
    res.status(200).json({
      status: 'success',
      data: patientEngagement
    });
  } catch (error) {
    console.error('Get patient engagement error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch patient engagement data'
    });
  }
});

// @route   POST /api/patients
// @desc    Create new patient engagement record
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const patientEngagement = new PatientEngagement({
      ...req.body,
      createdBy: req.user.id
    });
    
    await patientEngagement.save();
    res.status(201).json({
      status: 'success',
      data: patientEngagement
    });
  } catch (error) {
    console.error('Create patient engagement error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create patient engagement record'
    });
  }
});

// @route   GET /api/patients/engagement
// @desc    Get patient engagement analytics
// @access  Private
router.get('/engagement', auth, async (req, res) => {
  try {
    const totalEngagements = await PatientEngagement.countDocuments();
    const avgEngagementScore = await PatientEngagement.aggregate([
      { $group: { _id: null, avgScore: { $avg: '$engagementScore' } } }
    ]);
    
    res.status(200).json({
      status: 'success',
      data: {
        totalEngagements,
        avgEngagementScore: avgEngagementScore[0]?.avgScore || 0,
        engagementTrend: '+8.3%',
        topEngagementTypes: ['Educational Content', 'Health Tips', 'Medication Reminders'],
        demographicBreakdown: {
          '18-30': 25,
          '31-45': 35,
          '46-60': 28,
          '60+': 12
        },
        platformDistribution: {
          'Mobile App': 60,
          'Web Portal': 25,
          'SMS': 15
        }
      }
    });
  } catch (error) {
    console.error('Get patient engagement analytics error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch patient engagement analytics'
    });
  }
});

// @route   GET /api/patients/analytics
// @desc    Get patient analytics
// @access  Private
router.get('/analytics', auth, async (req, res) => {
  try {
    const totalPatients = await PatientEngagement.countDocuments();
    const activePatients = await PatientEngagement.countDocuments({ isActive: true });
    
    res.status(200).json({
      status: 'success',
      data: {
        totalPatients,
        activePatients,
        engagementRate: 78.5,
        completionRate: 85.2,
        satisfactionScore: 4.3,
        retentionRate: 92.1
      }
    });
  } catch (error) {
    console.error('Get patient analytics error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch patient analytics'
    });
  }
});

module.exports = router;
