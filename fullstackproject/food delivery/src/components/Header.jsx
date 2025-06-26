import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

const Header = ({ cartCount = 0, isLoggedIn = false, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            🍕 FoodExpress
          </Link>

          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/menu" className="nav-link">Menu</Link>
            <Link to="/restaurants" className="nav-link">Restaurants</Link>
            
            {isLoggedIn ? (
              <>
                <Link to="/profile" className="nav-link">Profile</Link>
                <button onClick={onLogout} className="nav-link logout-btn">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">Login</Link>
                <Link to="/register" className="nav-link register-btn">Sign Up</Link>
              </>
            )}
          </nav>

          <div className="header-actions">
            <button className="cart-btn">
              🛒 <span className="cart-count">{cartCount}</span>
            </button>
            
            <button className="menu-toggle" onClick={toggleMenu}>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header 