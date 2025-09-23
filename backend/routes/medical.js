const express = require('express');
const { auth } = require('../middleware/auth');
const MedicalContent = require('../models/MedicalContent');

const router = express.Router();

// @route   GET /api/medical
// @desc    Get all medical content
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const medicalContent = await MedicalContent.find().populate('createdBy', 'firstName lastName email');
    res.status(200).json({
      status: 'success',
      data: medicalContent
    });
  } catch (error) {
    console.error('Get medical content error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch medical content'
    });
  }
});

// @route   POST /api/medical
// @desc    Create new medical content
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const medicalContent = new MedicalContent({
      ...req.body,
      createdBy: req.user.id
    });
    
    await medicalContent.save();
    res.status(201).json({
      status: 'success',
      data: medicalContent
    });
  } catch (error) {
    console.error('Create medical content error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create medical content'
    });
  }
});

module.exports = router;
