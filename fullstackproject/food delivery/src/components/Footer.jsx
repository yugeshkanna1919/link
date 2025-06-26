import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <h3>🍕 FoodExpress</h3>
              <p>Delivering happiness to your doorstep</p>
            </div>
            <div className="social-links">
              <a href="#" className="social-link">📘</a>
              <a href="#" className="social-link">📷</a>
              <a href="#" className="social-link">🐦</a>
              <a href="#" className="social-link">📺</a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#menu">Menu</a></li>
              <li><a href="#restaurants">Restaurants</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li><a href="#help">Help Center</a></li>
              <li><a href="#tracking">Order Tracking</a></li>
              <li><a href="#refund">Refund Policy</a></li>
              <li><a href="#delivery">Delivery Info</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>For Restaurants</h4>
            <ul>
              <li><a href="#partner">Partner With Us</a></li>
              <li><a href="#register">Register Restaurant</a></li>
              <li><a href="#dashboard">Restaurant Dashboard</a></li>
              <li><a href="#analytics">Analytics</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="contact-info">
              <p>📧 support@foodexpress.com</p>
              <p>📞 +1 (555) 123-4567</p>
              <p>📍 123 Food Street, Cuisine City</p>
            </div>
            <div className="app-downloads">
              <h5>Download Our App</h5>
              <div className="app-buttons">
                <button className="app-btn">🍎 App Store</button>
                <button className="app-btn">🤖 Google Play</button>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; 2024 FoodExpress. All rights reserved.</p>
            <div className="footer-bottom-links">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
              <a href="#cookies">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 