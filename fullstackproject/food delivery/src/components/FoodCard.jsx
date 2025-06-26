import React, { useState } from 'react';
import './FoodCard.css';

const FoodCard = ({ food }) => {
  const [quantity, setQuantity] = useState(0);

  const handleAddToCart = () => {
    setQuantity(prev => prev + 1);
  };

  const handleRemoveFromCart = () => {
    setQuantity(prev => Math.max(0, prev - 1));
  };

  return (
    <div className="food-card">
      <div className="food-image">
        <img src={food.image} alt={food.name} />
        <div className="food-badge">
          {food.isPopular && <span className="popular-badge">🔥 Popular</span>}
          {food.isNew && <span className="new-badge">🆕 New</span>}
        </div>
      </div>
      
      <div className="food-content">
        <div className="food-header">
          <h3 className="food-name">{food.name}</h3>
          <div className="food-rating">
            <span className="stars">⭐</span>
            <span className="rating">{food.rating}</span>
            <span className="reviews">({food.reviews})</span>
          </div>
        </div>
        
        <p className="food-description">{food.description}</p>
        
        <div className="food-tags">
          {food.tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
        
        <div className="food-footer">
          <div className="price-section">
            <span className="price">${food.price}</span>
            {food.originalPrice && (
              <span className="original-price">${food.originalPrice}</span>
            )}
          </div>
          
          <div className="quantity-controls">
            {quantity > 0 && (
              <button 
                className="quantity-btn minus"
                onClick={handleRemoveFromCart}
              >
                -
              </button>
            )}
            {quantity > 0 && (
              <span className="quantity">{quantity}</span>
            )}
            <button 
              className="quantity-btn plus"
              onClick={handleAddToCart}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard; 