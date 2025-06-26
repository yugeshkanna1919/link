import React, { useState, useEffect } from 'react';
import RestaurantCard from '../components/RestaurantCard';
import apiService from '../services/api';
import './Restaurants.css';

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [filterOpen, setFilterOpen] = useState(false);

  const cuisines = [
    'All',
    'Italian',
    'American',
    'Japanese',
    'Chinese',
    'Indian',
    'Mexican',
    'Thai',
    'Mediterranean',
    'Other'
  ];

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await apiService.getRestaurants({ limit: 50 });
        setRestaurants(response.data?.restaurants || []);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
        // Use sample data if API fails
        setRestaurants([
          {
            id: 1,
            name: "Pizza Palace",
            cuisine: "Italian",
            image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400",
            rating: 4.6,
            reviews: 342,
            distance: 1.2,
            deliveryTime: 25,
            deliveryFee: 2.99,
            tags: ["Pizza", "Italian", "Fast Delivery"],
            isOpen: true,
            isFeatured: true
          },
          {
            id: 2,
            name: "Burger House",
            cuisine: "American",
            image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400",
            rating: 4.3,
            reviews: 189,
            distance: 0.8,
            deliveryTime: 20,
            deliveryFee: 1.99,
            tags: ["Burgers", "American", "Quick Service"],
            isOpen: true,
            isFeatured: false
          },
          {
            id: 3,
            name: "Sushi Master",
            cuisine: "Japanese",
            image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400",
            rating: 4.8,
            reviews: 456,
            distance: 2.1,
            deliveryTime: 35,
            deliveryFee: 3.99,
            tags: ["Sushi", "Japanese", "Premium"],
            isOpen: true,
            isFeatured: true
          },
          {
            id: 4,
            name: "Taco Fiesta",
            cuisine: "Mexican",
            image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400",
            rating: 4.4,
            reviews: 234,
            distance: 1.5,
            deliveryTime: 30,
            deliveryFee: 2.49,
            tags: ["Tacos", "Mexican", "Spicy"],
            isOpen: true,
            isFeatured: false
          },
          {
            id: 5,
            name: "Curry Corner",
            cuisine: "Indian",
            image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400",
            rating: 4.7,
            reviews: 312,
            distance: 1.8,
            deliveryTime: 40,
            deliveryFee: 3.49,
            tags: ["Curry", "Indian", "Spicy"],
            isOpen: true,
            isFeatured: true
          },
          {
            id: 6,
            name: "Noodle House",
            cuisine: "Chinese",
            image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
            rating: 4.2,
            reviews: 178,
            distance: 0.9,
            deliveryTime: 25,
            deliveryFee: 2.99,
            tags: ["Noodles", "Chinese", "Quick"],
            isOpen: true,
            isFeatured: false
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const filteredRestaurants = restaurants
    .filter(restaurant => {
      const matchesCuisine = selectedCuisine === 'All' || restaurant.cuisine === selectedCuisine;
      const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCuisine && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'distance':
          return a.distance - b.distance;
        case 'deliveryTime':
          return a.deliveryTime - b.deliveryTime;
        case 'deliveryFee':
          return a.deliveryFee - b.deliveryFee;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading restaurants...</p>
      </div>
    );
  }

  return (
    <div className="restaurants-page">
      <div className="restaurants-header">
        <div className="container">
          <h1>Restaurants</h1>
          <p>Discover amazing restaurants in your area</p>
        </div>
      </div>

      <div className="restaurants-content">
        <div className="container">
          <div className="restaurants-filters">
            <div className="search-section">
              <input
                type="text"
                placeholder="Search restaurants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="filters-section">
              <div className="filter-buttons">
                <button
                  className="filter-toggle"
                  onClick={() => setFilterOpen(!filterOpen)}
                >
                  🔍 Filters
                </button>
              </div>

              {filterOpen && (
                <div className="filter-options">
                  <div className="cuisine-filters">
                    <h4>Cuisine Type</h4>
                    <div className="cuisine-buttons">
                      {cuisines.map(cuisine => (
                        <button
                          key={cuisine}
                          className={`cuisine-btn ${selectedCuisine === cuisine ? 'active' : ''}`}
                          onClick={() => setSelectedCuisine(cuisine)}
                        >
                          {cuisine}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="sort-section">
                    <h4>Sort By</h4>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="sort-select"
                    >
                      <option value="rating">Highest Rating</option>
                      <option value="distance">Nearest First</option>
                      <option value="deliveryTime">Fastest Delivery</option>
                      <option value="deliveryFee">Lowest Delivery Fee</option>
                      <option value="name">Name A-Z</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="restaurants-results">
            <div className="results-header">
              <h3>{filteredRestaurants.length} restaurants found</h3>
              {selectedCuisine !== 'All' && (
                <span className="active-filter">
                  Cuisine: {selectedCuisine}
                </span>
              )}
            </div>

            {filteredRestaurants.length === 0 ? (
              <div className="no-results">
                <div className="no-results-icon">🍽️</div>
                <h3>No restaurants found</h3>
                <p>Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="restaurants-grid">
                {filteredRestaurants.map(restaurant => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Restaurants; 