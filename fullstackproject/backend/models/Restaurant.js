const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Restaurant name is required'],
    trim: true
  },
  cuisine: {
    type: String,
    required: [true, 'Cuisine type is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    required: [true, 'Restaurant image is required']
  },
  address: {
    street: {
      type: String,
      required: [true, 'Street address is required']
    },
    city: {
      type: String,
      required: [true, 'City is required']
    },
    state: {
      type: String,
      required: [true, 'State is required']
    },
    zipCode: {
      type: String,
      required: [true, 'Zip code is required']
    },
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required']
  },
  email: {
    type: String,
    lowercase: true,
    trim: true
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
  deliveryTime: {
    type: Number,
    default: 30, // minutes
    min: 1
  },
  deliveryFee: {
    type: Number,
    default: 2.99,
    min: 0
  },
  minimumOrder: {
    type: Number,
    default: 0,
    min: 0
  },
  tags: [{
    type: String,
    trim: true
  }],
  isOpen: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  operatingHours: {
    monday: { open: String, close: String },
    tuesday: { open: String, close: String },
    wednesday: { open: String, close: String },
    thursday: { open: String, close: String },
    friday: { open: String, close: String },
    saturday: { open: String, close: String },
    sunday: { open: String, close: String }
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Restaurant owner is required']
  }
}, {
  timestamps: true
});

// Index for location-based queries
restaurantSchema.index({ 'address.coordinates': '2dsphere' });

module.exports = mongoose.model('Restaurant', restaurantSchema); 