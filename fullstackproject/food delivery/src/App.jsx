import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Cart from './components/Cart'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Login from './pages/Login'
import Register from './pages/Register'
import Restaurants from './pages/Restaurants'
import Profile from './pages/Profile'
import './App.css'

function App() {
  const [cartItems, setCartItems] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'))

  // Sample data for demonstration
  const sampleFoods = [
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
  ]

  const sampleRestaurants = [
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
  ]

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setIsLoggedIn(false)
  }

  return (
    <Router>
      <div className="App">
        <Header 
          cartCount={cartCount} 
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
        />
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>

        <Footer />
        
        <Cart 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          setCartItems={setCartItems}
        />
      </div>
    </Router>
  )
}

export default App
