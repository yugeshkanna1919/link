const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Food name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0
  },
  originalPrice: {
    type: Number,
    min: 0
  },
  image: {
    type: String,
    required: [true, 'Food image is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Pizza', 'Burger', 'Sushi', 'Pasta', 'Dessert', 'Beverage', 'Other']
  },
  tags: [{
    type: String,
    trim: true
  }],
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: [true, 'Restaurant is required']
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviews: {
    type: Number,
    default: 0
  },
  isPopular: {
    type: Boolean,
    default: false
  },
  isNew: {
    type: Boolean,
    default: false
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  preparationTime: {
    type: Number,
    default: 20, // minutes
    min: 1
  },
  calories: {
    type: Number,
    min: 0
  },
  allergens: [{
    type: String,
    enum: ['Gluten', 'Dairy', 'Nuts', 'Eggs', 'Soy', 'Fish', 'Shellfish']
  }]
}, {
  timestamps: true
});

// Index for better search performance
foodSchema.index({ name: 'text', description: 'text', tags: 'text' });

// Add pagination plugin
foodSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Food', foodSchema); 