const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Helper method to make HTTP requests
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Authentication endpoints
  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  // User profile endpoints
  async getProfile() {
    return this.request('/users/profile');
  }

  async updateProfile(userData) {
    return this.request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async getUserOrders() {
    return this.request('/orders/user');
  }

  // Food endpoints
  async getFoods(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/foods?${queryString}`);
  }

  async getFoodById(id) {
    return this.request(`/foods/${id}`);
  }

  async createFood(foodData) {
    return this.request('/foods', {
      method: 'POST',
      body: JSON.stringify(foodData),
    });
  }

  async updateFood(id, foodData) {
    return this.request(`/foods/${id}`, {
      method: 'PUT',
      body: JSON.stringify(foodData),
    });
  }

  async deleteFood(id) {
    return this.request(`/foods/${id}`, {
      method: 'DELETE',
    });
  }

  // Restaurant endpoints
  async getRestaurants(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/restaurants?${queryString}`);
  }

  async getRestaurantById(id) {
    return this.request(`/restaurants/${id}`);
  }

  async getRestaurantMenu(id) {
    return this.request(`/restaurants/${id}/menu`);
  }

  // Order endpoints
  async getOrders() {
    return this.request('/orders');
  }

  async createOrder(orderData) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async getOrder(id) {
    return this.request(`/orders/${id}`);
  }

  async updateOrder(id, orderData) {
    return this.request(`/orders/${id}`, {
      method: 'PUT',
      body: JSON.stringify(orderData),
    });
  }

  async deleteOrder(id) {
    return this.request(`/orders/${id}`, {
      method: 'DELETE',
    });
  }

  // User endpoints
  async getUsers() {
    return this.request('/users');
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService; 