const express = require('express');
const { auth } = require('../middleware/auth');
const Campaign = require('../models/Campaign');
const MedicalContent = require('../models/MedicalContent');
const PatientEngagement = require('../models/PatientEngagement');
const HCP = require('../models/HCP');

const router = express.Router();

// @route   GET /api/dashboard/metrics
// @desc    Get dashboard metrics
// @access  Private
router.get('/metrics', auth, async (req, res) => {
  try {
    const [
      totalCampaigns,
      totalMedicalContent,
      totalPatientEngagement,
      totalHCPs
    ] = await Promise.all([
      Campaign.countDocuments(),
      MedicalContent.countDocuments(),
      PatientEngagement.countDocuments(),
      HCP.countDocuments()
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        activeCampaigns: totalCampaigns,
        totalReach: totalPatientEngagement * 10, // Mock calculation
        doctorShares: totalHCPs,
        completionRate: Math.floor(Math.random() * 30 + 70), // Mock 70-100%
        roiImprovement: Math.floor(Math.random() * 20 + 10), // Mock 10-30%
        patientEngagement: totalPatientEngagement,
        hcpSatisfaction: Math.floor(Math.random() * 20 + 80) // Mock 80-100%
      }
    });
  } catch (error) {
    console.error('Get dashboard metrics error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch dashboard metrics'
    });
  }
});

// @route   GET /api/dashboard/stats
// @desc    Get dashboard statistics
// @access  Private
router.get('/stats', auth, async (req, res) => {
  try {
    const [
      totalCampaigns,
      totalMedicalContent,
      totalPatientEngagement,
      totalHCPs
    ] = await Promise.all([
      Campaign.countDocuments(),
      MedicalContent.countDocuments(),
      PatientEngagement.countDocuments(),
      HCP.countDocuments()
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        totalCampaigns,
        totalMedicalContent,
        totalPatientEngagement,
        totalHCPs
      }
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch dashboard statistics'
    });
  }
});

// @route   GET /api/dashboard/recent
// @desc    Get recent activities
// @access  Private
router.get('/recent', auth, async (req, res) => {
  try {
    const [recentCampaigns, recentMedicalContent] = await Promise.all([
      Campaign.find().sort({ createdAt: -1 }).limit(5).populate('createdBy', 'firstName lastName'),
      MedicalContent.find().sort({ createdAt: -1 }).limit(5).populate('createdBy', 'firstName lastName')
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        recentCampaigns,
        recentMedicalContent
      }
    });
  } catch (error) {
    console.error('Get recent activities error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch recent activities'
    });
  }
});

// @route   GET /api/dashboard/roi-signals
// @desc    Get ROI signals and performance metrics
// @access  Private
router.get('/roi-signals', auth, async (req, res) => {
  try {
    // Get campaign performance data
    const campaigns = await Campaign.find().populate('createdBy', 'firstName lastName');
    
    // Calculate ROI metrics (mock data for now - replace with actual calculations)
    const roiSignals = [
      {
        metric: 'Total ROI',
        value: '245.6%',
        change: '+12.3% this month'
      },
      {
        metric: 'Click Through Rate',
        value: '3.2%',
        change: '+0.8% vs last month'
      },
      {
        metric: 'Conversion Rate',
        value: '8.7%',
        change: '+1.2% vs last month'
      },
      {
        metric: 'Cost Per Acquisition',
        value: '$45.30',
        change: '-$5.20 vs last month'
      },
      {
        metric: 'Return on Ad Spend',
        value: '4.2x',
        change: '+0.3x vs last month'
      },
      {
        metric: 'Patient Engagement',
        value: '87%',
        change: '+5% vs last month'
      }
    ];

    res.status(200).json({
      status: 'success',
      data: roiSignals
    });
  } catch (error) {
    console.error('Get ROI signals error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch ROI signals'
    });
  }
});

module.exports = router;
