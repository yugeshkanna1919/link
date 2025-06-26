const express = require('express');
const Restaurant = require('../models/Restaurant');
const router = express.Router();

// Get all restaurants
router.get('/', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      cuisine, 
      search,
      isOpen,
      isFeatured,
      minRating
    } = req.query;

    const query = {};

    if (cuisine) query.cuisine = cuisine;
    if (isOpen === 'true') query.isOpen = true;
    if (isFeatured === 'true') query.isFeatured = true;
    if (minRating) query.rating = { $gte: parseFloat(minRating) };
    if (search) query.$text = { $search: search };

    const restaurants = await Restaurant.find(query)
      .populate('owner', 'name email')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Restaurant.countDocuments(query);

    res.json({
      success: true,
      data: {
        restaurants,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        total
      }
    });

  } catch (error) {
    console.error('Get restaurants error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching restaurants',
      error: error.message
    });
  }
});

// Get restaurant by ID
router.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id)
      .populate('owner', 'name email');

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found'
      });
    }

    res.json({
      success: true,
      data: { restaurant }
    });

  } catch (error) {
    console.error('Get restaurant error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching restaurant',
      error: error.message
    });
  }
});

module.exports = router; 