const express = require('express');
const Food = require('../models/Food');
const router = express.Router();

// Get all foods
router.get('/', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      category, 
      restaurant, 
      search,
      isPopular,
      isNew,
      minPrice,
      maxPrice
    } = req.query;

    const query = {};

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by restaurant
    if (restaurant) {
      query.restaurant = restaurant;
    }

    // Filter by popularity
    if (isPopular === 'true') {
      query.isPopular = true;
    }

    // Filter by new items
    if (isNew === 'true') {
      query.isNew = true;
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      populate: {
        path: 'restaurant',
        select: 'name cuisine rating'
      },
      sort: { createdAt: -1 }
    };

    const foods = await Food.paginate(query, options);

    res.json({
      success: true,
      data: foods
    });

  } catch (error) {
    console.error('Get foods error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching foods',
      error: error.message
    });
  }
});

// Get food by ID
router.get('/:id', async (req, res) => {
  try {
    const food = await Food.findById(req.params.id)
      .populate('restaurant', 'name cuisine rating address');

    if (!food) {
      return res.status(404).json({
        success: false,
        message: 'Food not found'
      });
    }

    res.json({
      success: true,
      data: { food }
    });

  } catch (error) {
    console.error('Get food error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching food',
      error: error.message
    });
  }
});

// Create new food (requires authentication)
router.post('/', async (req, res) => {
  try {
    const foodData = req.body;
    const food = new Food(foodData);
    await food.save();

    res.status(201).json({
      success: true,
      message: 'Food created successfully',
      data: { food }
    });

  } catch (error) {
    console.error('Create food error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating food',
      error: error.message
    });
  }
});

// Update food
router.put('/:id', async (req, res) => {
  try {
    const food = await Food.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!food) {
      return res.status(404).json({
        success: false,
        message: 'Food not found'
      });
    }

    res.json({
      success: true,
      message: 'Food updated successfully',
      data: { food }
    });

  } catch (error) {
    console.error('Update food error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating food',
      error: error.message
    });
  }
});

// Delete food
router.delete('/:id', async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);

    if (!food) {
      return res.status(404).json({
        success: false,
        message: 'Food not found'
      });
    }

    res.json({
      success: true,
      message: 'Food deleted successfully'
    });

  } catch (error) {
    console.error('Delete food error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting food',
      error: error.message
    });
  }
});

module.exports = router; 