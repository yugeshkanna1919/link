import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await apiService.getProfile();
        setUser(response.data.user);
        setFormData({
          name: response.data.user.name || '',
          email: response.data.user.email || '',
          phone: response.data.user.phone || '',
          address: response.data.user.address || ''
        });

        // Fetch user orders
        const ordersResponse = await apiService.getUserOrders();
        setOrders(ordersResponse.data?.orders || []);
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Use sample data if API fails
        const sampleUser = {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+1 234 567 8900',
          address: '123 Main St, City, State 12345',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
          joinDate: '2023-01-15'
        };
        setUser(sampleUser);
        setFormData({
          name: sampleUser.name,
          email: sampleUser.email,
          phone: sampleUser.phone,
          address: sampleUser.address
        });

        // Sample orders
        setOrders([
          {
            id: 1,
            orderNumber: 'ORD-001',
            restaurant: 'Pizza Palace',
            items: ['Margherita Pizza', 'Garlic Bread'],
            total: 24.99,
            status: 'Delivered',
            date: '2024-01-15',
            deliveryAddress: '123 Main St, City, State 12345'
          },
          {
            id: 2,
            orderNumber: 'ORD-002',
            restaurant: 'Burger House',
            items: ['Classic Burger', 'French Fries', 'Coke'],
            total: 18.50,
            status: 'In Progress',
            date: '2024-01-20',
            deliveryAddress: '123 Main St, City, State 12345'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await apiService.updateProfile(formData);
      setUser(response.data.user);
      setEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (loading && !user) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="container">
          <h1>My Profile</h1>
          <p>Manage your account and view your orders</p>
        </div>
      </div>

      <div className="profile-content">
        <div className="container">
          <div className="profile-tabs">
            <button
              className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              👤 Profile
            </button>
            <button
              className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              📋 Orders
            </button>
            <button
              className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              ⚙️ Settings
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'profile' && (
              <div className="profile-section">
                <div className="profile-card">
                  <div className="profile-avatar">
                    <img src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'} alt="Profile" />
                    <button className="avatar-edit">📷</button>
                  </div>

                  {!editing ? (
                    <div className="profile-info">
                      <h2>{user?.name}</h2>
                      <p className="email">{user?.email}</p>
                      <p className="phone">{user?.phone}</p>
                      <p className="address">{user?.address}</p>
                      <p className="join-date">Member since {new Date(user?.joinDate).toLocaleDateString()}</p>
                      
                      <button
                        className="edit-btn"
                        onClick={() => setEditing(true)}
                      >
                        Edit Profile
                      </button>
                    </div>
                  ) : (
                    <form className="profile-form" onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label>Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label>Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label>Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>Address</label>
                        <textarea
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          rows="3"
                        />
                      </div>

                      <div className="form-actions">
                        <button
                          type="button"
                          className="cancel-btn"
                          onClick={() => setEditing(false)}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="save-btn"
                          disabled={loading}
                        >
                          {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="orders-section">
                <h2>Order History</h2>
                {orders.length === 0 ? (
                  <div className="no-orders">
                    <div className="no-orders-icon">📋</div>
                    <h3>No orders yet</h3>
                    <p>Start ordering delicious food to see your order history here</p>
                  </div>
                ) : (
                  <div className="orders-list">
                    {orders.map(order => (
                      <div key={order.id} className="order-card">
                        <div className="order-header">
                          <h3>Order #{order.orderNumber}</h3>
                          <span className={`order-status ${order.status.toLowerCase()}`}>
                            {order.status}
                          </span>
                        </div>
                        
                        <div className="order-details">
                          <p className="restaurant">🍽️ {order.restaurant}</p>
                          <p className="items">{order.items.join(', ')}</p>
                          <p className="total">Total: ${order.total}</p>
                          <p className="date">Ordered on {new Date(order.date).toLocaleDateString()}</p>
                          <p className="address">📍 {order.deliveryAddress}</p>
                        </div>

                        <div className="order-actions">
                          <button className="reorder-btn">Reorder</button>
                          <button className="track-btn">Track Order</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="settings-section">
                <h2>Account Settings</h2>
                
                <div className="settings-card">
                  <h3>Security</h3>
                  <button className="setting-btn">Change Password</button>
                  <button className="setting-btn">Two-Factor Authentication</button>
                </div>

                <div className="settings-card">
                  <h3>Notifications</h3>
                  <div className="setting-item">
                    <span>Order Updates</span>
                    <input type="checkbox" defaultChecked />
                  </div>
                  <div className="setting-item">
                    <span>Promotional Emails</span>
                    <input type="checkbox" defaultChecked />
                  </div>
                  <div className="setting-item">
                    <span>SMS Notifications</span>
                    <input type="checkbox" />
                  </div>
                </div>

                <div className="settings-card">
                  <h3>Privacy</h3>
                  <button className="setting-btn">Privacy Policy</button>
                  <button className="setting-btn">Terms of Service</button>
                </div>

                <div className="settings-card danger-zone">
                  <h3>Danger Zone</h3>
                  <button className="danger-btn" onClick={handleLogout}>
                    Logout
                  </button>
                  <button className="danger-btn delete">
                    Delete Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 