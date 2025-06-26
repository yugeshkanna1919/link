const express = require('express');
const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Users route working',
      data: []
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    });
  }
});

module.exports = router; 