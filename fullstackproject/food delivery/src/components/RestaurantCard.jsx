import React from 'react';
import './RestaurantCard.css';

const RestaurantCard = ({ restaurant }) => {
  return (
    <div className="restaurant-card">
      <div className="restaurant-image">
        <img src={restaurant.image} alt={restaurant.name} />
        <div className="restaurant-badges">
          {restaurant.isOpen && <span className="open-badge">🟢 Open</span>}
          {restaurant.isFeatured && <span className="featured-badge">⭐ Featured</span>}
        </div>
      </div>
      
      <div className="restaurant-content">
        <div className="restaurant-header">
          <h3 className="restaurant-name">{restaurant.name}</h3>
          <div className="restaurant-rating">
            <span className="stars">⭐</span>
            <span className="rating">{restaurant.rating}</span>
            <span className="reviews">({restaurant.reviews})</span>
          </div>
        </div>
        
        <p className="restaurant-cuisine">{restaurant.cuisine}</p>
        
        <div className="restaurant-details">
          <div className="detail-item">
            <span className="detail-icon">📍</span>
            <span className="detail-text">{restaurant.distance} km away</span>
          </div>
          <div className="detail-item">
            <span className="detail-icon">⏱️</span>
            <span className="detail-text">{restaurant.deliveryTime} min</span>
          </div>
          <div className="detail-item">
            <span className="detail-icon">🚚</span>
            <span className="detail-text">${restaurant.deliveryFee} delivery</span>
          </div>
        </div>
        
        <div className="restaurant-tags">
          {restaurant.tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
        
        <div className="restaurant-footer">
          <button className="view-menu-btn">View Menu</button>
          <button className="order-now-btn">Order Now</button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard; 