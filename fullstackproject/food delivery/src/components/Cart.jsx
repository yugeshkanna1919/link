import React, { useState } from 'react';
import './Cart.css';

const Cart = ({ isOpen, onClose, cartItems = [] }) => {
  const [promoCode, setPromoCode] = useState('');

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateDeliveryFee = () => {
    const subtotal = calculateSubtotal();
    return subtotal > 50 ? 0 : 5;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateDeliveryFee();
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    // This would typically call a function passed from parent to update cart
    console.log(`Update item ${itemId} to quantity ${newQuantity}`);
  };

  const handleRemoveItem = (itemId) => {
    // This would typically call a function passed from parent to remove item
    console.log(`Remove item ${itemId}`);
  };

  const handleCheckout = () => {
    // This would typically navigate to checkout page
    console.log('Proceed to checkout');
  };

  if (!isOpen) return null;

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-container" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="cart-content">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart-icon">🛒</div>
              <h3>Your cart is empty</h3>
              <p>Add some delicious food to get started!</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    
                    <div className="cart-item-details">
                      <h4 className="cart-item-name">{item.name}</h4>
                      <p className="cart-item-price">${item.price}</p>
                      
                      <div className="cart-item-controls">
                        <button 
                          className="quantity-btn minus"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button 
                          className="quantity-btn plus"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                        <button 
                          className="remove-btn"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <div className="promo-code">
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <button className="apply-btn">Apply</button>
                </div>

                <div className="summary-details">
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span>${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Delivery Fee</span>
                    <span>{calculateDeliveryFee() === 0 ? 'Free' : `$${calculateDeliveryFee()}`}</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>

                <button 
                  className="checkout-btn"
                  onClick={handleCheckout}
                  disabled={cartItems.length === 0}
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart; 