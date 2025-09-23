const express = require('express');
const { auth } = require('../middleware/auth');
const HCP = require('../models/HCP');

const router = express.Router();

// @route   GET /api/hcp
// @desc    Get all HCP data
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const hcps = await HCP.find();
    res.status(200).json({
      status: 'success',
      data: hcps
    });
  } catch (error) {
    console.error('Get HCPs error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch HCP data'
    });
  }
});

// @route   POST /api/hcp
// @desc    Create new HCP record
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const hcp = new HCP({
      ...req.body,
      createdBy: req.user.id
    });
    
    await hcp.save();
    res.status(201).json({
      status: 'success',
      data: hcp
    });
  } catch (error) {
    console.error('Create HCP error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create HCP record'
    });
  }
});

// @route   GET /api/hcp/:id
// @desc    Get HCP by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const hcp = await HCP.findById(req.params.id);
    if (!hcp) {
      return res.status(404).json({
        status: 'error',
        message: 'HCP not found'
      });
    }
    res.status(200).json({
      status: 'success',
      data: hcp
    });
  } catch (error) {
    console.error('Get HCP error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch HCP data'
    });
  }
});

// @route   PUT /api/hcp/:id
// @desc    Update HCP record
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const hcp = await HCP.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!hcp) {
      return res.status(404).json({
        status: 'error',
        message: 'HCP not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: hcp
    });
  } catch (error) {
    console.error('Update HCP error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update HCP record'
    });
  }
});

// @route   PUT /api/hcp/:id/engagement
// @desc    Update HCP engagement
// @access  Private
router.put('/:id/engagement', auth, async (req, res) => {
  try {
    const hcp = await HCP.findByIdAndUpdate(
      req.params.id,
      { engagement: req.body },
      { new: true, runValidators: true }
    );
    
    if (!hcp) {
      return res.status(404).json({
        status: 'error',
        message: 'HCP not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: hcp
    });
  } catch (error) {
    console.error('Update HCP engagement error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update HCP engagement'
    });
  }
});

// @route   GET /api/hcp/analytics/summary
// @desc    Get HCP analytics summary
// @access  Private
router.get('/analytics/summary', auth, async (req, res) => {
  try {
    const totalHCPs = await HCP.countDocuments();
    const activeHCPs = await HCP.countDocuments({ isActive: true });
    const avgEngagement = await HCP.aggregate([
      { $group: { _id: null, avgEngagement: { $avg: '$engagementScore' } } }
    ]);
    
    res.status(200).json({
      status: 'success',
      data: {
        totalHCPs,
        activeHCPs,
        avgEngagement: avgEngagement[0]?.avgEngagement || 0,
        engagementTrend: '+12.5%',
        topSpecialties: ['Cardiology', 'Neurology', 'Oncology'],
        regionalDistribution: {
          'North': 35,
          'South': 28,
          'East': 22,
          'West': 15
        }
      }
    });
  } catch (error) {
    console.error('Get HCP analytics error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch HCP analytics'
    });
  }
});

// @route   GET /api/hcp/engagement/top
// @desc    Get top engaged HCPs
// @access  Private
router.get('/engagement/top', auth, async (req, res) => {
  try {
    const topHCPs = await HCP.find()
      .sort({ engagementScore: -1 })
      .limit(10);
    
    res.status(200).json({
      status: 'success',
      data: topHCPs.map(hcp => ({
        id: hcp._id,
        name: hcp.name || 'Unknown HCP',
        specialty: hcp.specialty || 'General',
        engagementScore: hcp.engagementScore || 0,
        lastActivity: hcp.lastActive || new Date(),
        city: hcp.city || 'Unknown'
      }))
    });
  } catch (error) {
    console.error('Get top engaged HCPs error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch top engaged HCPs'
    });
  }
});

// @route   GET /api/hcp/engagement/least
// @desc    Get least engaged HCPs
// @access  Private
router.get('/engagement/least', auth, async (req, res) => {
  try {
    const leastHCPs = await HCP.find()
      .sort({ engagementScore: 1 })
      .limit(10);
    
    res.status(200).json({
      status: 'success',
      data: leastHCPs.map(hcp => ({
        id: hcp._id,
        name: hcp.name || 'Unknown HCP',
        specialty: hcp.specialty || 'General',
        engagementScore: hcp.engagementScore || 0,
        lastActivity: hcp.lastActive || new Date(),
        city: hcp.city || 'Unknown'
      }))
    });
  } catch (error) {
    console.error('Get least engaged HCPs error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch least engaged HCPs'
    });
  }
});

module.exports = router;
