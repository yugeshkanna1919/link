import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Delicious Food Delivered to Your Doorstep
          </h1>
          <p className="hero-subtitle">
            Order from your favorite restaurants and get fresh, hot food delivered in minutes. 
            From pizza to sushi, we've got everything you crave.
          </p>
          <div className="hero-actions">
            <button className="order-btn">Order Now</button>
            <button className="browse-btn">Browse Restaurants</button>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">500+</span>
              <span className="stat-label">Restaurants</span>
            </div>
            <div className="stat">
              <span className="stat-number">30min</span>
              <span className="stat-label">Average Delivery</span>
            </div>
            <div className="stat">
              <span className="stat-number">50k+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <div className="food-showcase">
            <div className="food-item pizza">🍕</div>
            <div className="food-item burger">🍔</div>
            <div className="food-item sushi">🍣</div>
            <div className="food-item pasta">🍝</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 