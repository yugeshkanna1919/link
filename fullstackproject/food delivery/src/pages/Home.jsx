import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import FoodCard from '../components/FoodCard';
import RestaurantCard from '../components/RestaurantCard';
import apiService from '../services/api';
import './Home.css';

const Home = () => {
  const [featuredFoods, setFeaturedFoods] = useState([]);
  const [popularRestaurants, setPopularRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch featured foods
        const foodsResponse = await apiService.getFoods({ 
          isPopular: 'true', 
          limit: 8 
        });
        setFeaturedFoods(foodsResponse.data?.docs || []);

        // Fetch popular restaurants
        const restaurantsResponse = await apiService.getRestaurants({ 
          isFeatured: 'true', 
          limit: 6 
        });
        setPopularRestaurants(restaurantsResponse.data?.restaurants || []);

      } catch (error) {
        console.error('Error fetching data:', error);
        // Use sample data if API fails
        setFeaturedFoods([
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
            isPopular: false,
            isNew: false
          }
        ]);

        setPopularRestaurants([
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
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading delicious food...</p>
      </div>
    );
  }

  return (
    <div className="home-page">
      <Hero />
      
      <section className="featured-foods">
        <div className="container">
          <div className="section-header">
            <h2>Featured Foods</h2>
            <p>Discover our most popular dishes</p>
          </div>
          <div className="foods-grid">
            {featuredFoods.map(food => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>
        </div>
      </section>

      <section className="popular-restaurants">
        <div className="container">
          <div className="section-header">
            <h2>Popular Restaurants</h2>
            <p>Top-rated restaurants in your area</p>
          </div>
          <div className="restaurants-grid">
            {popularRestaurants.map(restaurant => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>Fast Delivery</h3>
              <p>Get your food delivered in 30 minutes or less</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🍽️</div>
              <h3>Fresh Food</h3>
              <p>All our food is prepared fresh and with quality ingredients</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💳</div>
              <h3>Secure Payment</h3>
              <p>Multiple payment options with secure transactions</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⭐</div>
              <h3>Best Quality</h3>
              <p>We partner with the best restaurants in your area</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 