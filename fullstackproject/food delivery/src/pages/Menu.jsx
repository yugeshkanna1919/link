import React, { useState, useEffect } from 'react';
import FoodCard from '../components/FoodCard';
import apiService from '../services/api';
import './Menu.css';

const Menu = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const categories = [
    'All',
    'Pizza',
    'Burger',
    'Sushi',
    'Pasta',
    'Dessert',
    'Beverage',
    'Other'
  ];

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await apiService.getFoods({ limit: 50 });
        setFoods(response.data?.docs || []);
      } catch (error) {
        console.error('Error fetching foods:', error);
        // Use sample data if API fails
        setFoods([
          {
            id: 1,
            name: "Margherita Pizza",
            description: "Classic tomato sauce with mozzarella cheese and fresh basil",
            price: 12.99,
            originalPrice: 15.99,
            image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400",
            rating: 4.5,
            reviews: 128,
            tags: ["Italian", "Vegetarian"],
            category: "Pizza",
            isPopular: true,
            isNew: false
          },
          {
            id: 2,
            name: "Chicken Burger",
            description: "Grilled chicken breast with lettuce, tomato, and special sauce",
            price: 9.99,
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
            rating: 4.3,
            reviews: 95,
            tags: ["American", "Non-vegetarian"],
            category: "Burger",
            isPopular: false,
            isNew: true
          },
          {
            id: 3,
            name: "Sushi Roll",
            description: "Fresh salmon and avocado roll with soy sauce and wasabi",
            price: 16.99,
            image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400",
            rating: 4.7,
            reviews: 203,
            tags: ["Japanese", "Seafood"],
            category: "Sushi",
            isPopular: true,
            isNew: false
          },
          {
            id: 4,
            name: "Pasta Carbonara",
            description: "Creamy pasta with bacon, eggs, and parmesan cheese",
            price: 14.99,
            image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400",
            rating: 4.4,
            reviews: 87,
            tags: ["Italian", "Creamy"],
            category: "Pasta",
            isPopular: false,
            isNew: false
          },
          {
            id: 5,
            name: "Chocolate Cake",
            description: "Rich chocolate cake with vanilla ice cream",
            price: 8.99,
            image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400",
            rating: 4.6,
            reviews: 156,
            tags: ["Dessert", "Sweet"],
            category: "Dessert",
            isPopular: true,
            isNew: false
          },
          {
            id: 6,
            name: "Iced Coffee",
            description: "Cold brewed coffee with cream and sugar",
            price: 4.99,
            image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400",
            rating: 4.2,
            reviews: 89,
            tags: ["Beverage", "Cold"],
            category: "Beverage",
            isPopular: false,
            isNew: true
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  const filteredFoods = foods
    .filter(food => {
      const matchesCategory = selectedCategory === 'All' || food.category === selectedCategory;
      const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           food.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading menu...</p>
      </div>
    );
  }

  return (
    <div className="menu-page">
      <div className="menu-header">
        <div className="container">
          <h1>Our Menu</h1>
          <p>Discover delicious food from the best restaurants</p>
        </div>
      </div>

      <div className="menu-content">
        <div className="container">
          <div className="menu-filters">
            <div className="search-section">
              <input
                type="text"
                placeholder="Search for food..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="filters-section">
              <div className="category-filters">
                {categories.map(category => (
                  <button
                    key={category}
                    className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="sort-section">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="name">Sort by Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Sort by Rating</option>
                </select>
              </div>
            </div>
          </div>

          <div className="menu-results">
            <div className="results-header">
              <h3>{filteredFoods.length} items found</h3>
            </div>

            {filteredFoods.length === 0 ? (
              <div className="no-results">
                <div className="no-results-icon">🍽️</div>
                <h3>No food found</h3>
                <p>Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="foods-grid">
                {filteredFoods.map(food => (
                  <FoodCard key={food.id} food={food} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu; 