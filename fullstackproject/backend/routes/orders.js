const express = require('express');
const router = express.Router();

// Get all orders
router.get('/', async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Orders route working',
      data: []
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching orders',
      error: error.message
    });
  }
});

module.exports = router; 