const express = require('express');
const { auth } = require('../middleware/auth');
const Campaign = require('../models/Campaign');

const router = express.Router();

// @route   GET /api/campaigns
// @desc    Get all campaigns
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const campaigns = await Campaign.find().populate('createdBy', 'firstName lastName email');
    res.status(200).json({
      status: 'success',
      data: campaigns
    });
  } catch (error) {
    console.error('Get campaigns error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch campaigns'
    });
  }
});

// @route   POST /api/campaigns
// @desc    Create a new campaign
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const campaign = new Campaign({
      ...req.body,
      createdBy: req.user.id
    });
    
    await campaign.save();
    res.status(201).json({
      status: 'success',
      data: campaign
    });
  } catch (error) {
    console.error('Create campaign error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create campaign'
    });
  }
});

module.exports = router;
