import { connectDB } from './config/db.js';
import User from './model/user.js';
import Restaurant from './model/restaurant.js';
import Food from './model/food.js';
import dotenv from 'dotenv';

dotenv.config();

const sampleUsers = [
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        phone: '+1 234 567 8900',
        role: 'user',
        address: {
            street: '123 Main St',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            country: 'USA'
        }
    },
    {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123',
        phone: '+1 234 567 8901',
        role: 'restaurant',
        address: {
            street: '456 Oak Ave',
            city: 'New York',
            state: 'NY',
            zipCode: '10002',
            country: 'USA'
        }
    }
];

const sampleRestaurants = [
    {
        name: 'Pizza Palace',
        description: 'Authentic Italian pizza made with fresh ingredients and traditional recipes',
        cuisine: 'Italian',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
        rating: 4.6,
        reviews: 342,
        distance: 1.2,
        deliveryTime: 25,
        deliveryFee: 2.99,
        minimumOrder: 10,
        tags: ['Pizza', 'Italian', 'Fast Delivery'],
        isOpen: true,
        isFeatured: true,
        address: {
            street: '789 Pizza St',
            city: 'New York',
            state: 'NY',
            zipCode: '10003',
            country: 'USA'
        },
        phone: '+1 234 567 8902',
        email: 'info@pizzapalace.com'
    },
    {
        name: 'Burger House',
        description: 'Juicy burgers and crispy fries made with premium beef and fresh vegetables',
        cuisine: 'American',
        image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400',
        rating: 4.3,
        reviews: 189,
        distance: 0.8,
        deliveryTime: 20,
        deliveryFee: 1.99,
        minimumOrder: 8,
        tags: ['Burgers', 'American', 'Quick Service'],
        isOpen: true,
        isFeatured: false,
        address: {
            street: '321 Burger Ave',
            city: 'New York',
            state: 'NY',
            zipCode: '10004',
            country: 'USA'
        },
        phone: '+1 234 567 8903',
        email: 'info@burgerhouse.com'
    },
    {
        name: 'Sushi Master',
        description: 'Fresh and authentic Japanese sushi prepared by expert chefs',
        cuisine: 'Japanese',
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400',
        rating: 4.8,
        reviews: 456,
        distance: 2.1,
        deliveryTime: 35,
        deliveryFee: 3.99,
        minimumOrder: 15,
        tags: ['Sushi', 'Japanese', 'Premium'],
        isOpen: true,
        isFeatured: true,
        address: {
            street: '654 Sushi Rd',
            city: 'New York',
            state: 'NY',
            zipCode: '10005',
            country: 'USA'
        },
        phone: '+1 234 567 8904',
        email: 'info@sushimaster.com'
    }
];

const sampleFoods = [
    // Pizza Palace Foods
    {
        name: 'Margherita Pizza',
        description: 'Classic tomato sauce with mozzarella cheese and fresh basil',
        price: 12.99,
        originalPrice: 15.99,
        image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400',
        category: 'Main Course',
        cuisine: 'Italian',
        rating: 4.5,
        reviews: 128,
        tags: ['Italian', 'Vegetarian'],
        isPopular: true,
        isNew: false,
        isAvailable: true,
        preparationTime: 15,
        calories: 285,
        ingredients: ['Pizza dough', 'Tomato sauce', 'Mozzarella cheese', 'Fresh basil', 'Olive oil']
    },
    {
        name: 'Pepperoni Pizza',
        description: 'Spicy pepperoni with melted cheese and tomato sauce',
        price: 14.99,
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
        category: 'Main Course',
        cuisine: 'Italian',
        rating: 4.6,
        reviews: 95,
        tags: ['Italian', 'Spicy'],
        isPopular: true,
        isNew: false,
        isAvailable: true,
        preparationTime: 18,
        calories: 320,
        ingredients: ['Pizza dough', 'Tomato sauce', 'Mozzarella cheese', 'Pepperoni', 'Spices']
    },
    // Burger House Foods
    {
        name: 'Classic Burger',
        description: 'Juicy beef patty with lettuce, tomato, and special sauce',
        price: 9.99,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
        category: 'Main Course',
        cuisine: 'American',
        rating: 4.3,
        reviews: 95,
        tags: ['American', 'Non-vegetarian'],
        isPopular: false,
        isNew: true,
        isAvailable: true,
        preparationTime: 12,
        calories: 450,
        ingredients: ['Beef patty', 'Bun', 'Lettuce', 'Tomato', 'Onion', 'Special sauce']
    },
    {
        name: 'Chicken Burger',
        description: 'Grilled chicken breast with lettuce, tomato, and special sauce',
        price: 8.99,
        image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400',
        category: 'Main Course',
        cuisine: 'American',
        rating: 4.2,
        reviews: 78,
        tags: ['American', 'Non-vegetarian'],
        isPopular: false,
        isNew: false,
        isAvailable: true,
        preparationTime: 15,
        calories: 380,
        ingredients: ['Chicken breast', 'Bun', 'Lettuce', 'Tomato', 'Special sauce']
    },
    // Sushi Master Foods
    {
        name: 'Salmon Nigiri',
        description: 'Fresh salmon over seasoned rice',
        price: 6.99,
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400',
        category: 'Main Course',
        cuisine: 'Japanese',
        rating: 4.7,
        reviews: 203,
        tags: ['Japanese', 'Seafood'],
        isPopular: true,
        isNew: false,
        isAvailable: true,
        preparationTime: 8,
        calories: 120,
        ingredients: ['Fresh salmon', 'Sushi rice', 'Wasabi', 'Nori']
    },
    {
        name: 'California Roll',
        description: 'Crab, avocado, and cucumber roll with rice',
        price: 8.99,
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400',
        category: 'Main Course',
        cuisine: 'Japanese',
        rating: 4.5,
        reviews: 156,
        tags: ['Japanese', 'Seafood'],
        isPopular: true,
        isNew: false,
        isAvailable: true,
        preparationTime: 12,
        calories: 180,
        ingredients: ['Crab', 'Avocado', 'Cucumber', 'Sushi rice', 'Nori']
    }
];

const seedData = async () => {
    try {
        await connectDB();

        // Clear existing data
        await User.deleteMany();
        await Restaurant.deleteMany();
        await Food.deleteMany();

        console.log('🗑️  Cleared existing data');

        // Create users
        const createdUsers = await User.create(sampleUsers);
        console.log(`👥 Created ${createdUsers.length} users`);

        // Get restaurant owner
        const restaurantOwner = createdUsers.find(user => user.role === 'restaurant');

        // Create restaurants with owner
        const restaurantsWithOwner = sampleRestaurants.map(restaurant => ({
            ...restaurant,
            owner: restaurantOwner._id
        }));

        const createdRestaurants = await Restaurant.create(restaurantsWithOwner);
        console.log(`🏪 Created ${createdRestaurants.length} restaurants`);

        // Create foods with restaurant references
        const foodsWithRestaurants = [];
        let restaurantIndex = 0;

        sampleFoods.forEach((food, index) => {
            // Assign foods to restaurants in a round-robin fashion
            const restaurant = createdRestaurants[restaurantIndex % createdRestaurants.length];
            foodsWithRestaurants.push({
                ...food,
                restaurant: restaurant._id
            });

            // Move to next restaurant every 2 foods
            if ((index + 1) % 2 === 0) {
                restaurantIndex++;
            }
        });

        const createdFoods = await Food.create(foodsWithRestaurants);
        console.log(`🍕 Created ${createdFoods.length} foods`);

        console.log('✅ Database seeded successfully!');
        console.log('\n📋 Sample Data Summary:');
        console.log(`- Users: ${createdUsers.length}`);
        console.log(`- Restaurants: ${createdRestaurants.length}`);
        console.log(`- Foods: ${createdFoods.length}`);
        console.log('\n🔑 Sample Login Credentials:');
        console.log('User: john@example.com / password123');
        console.log('Restaurant Owner: jane@example.com / password123');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding data:', error);
        process.exit(1);
    }
};

// Run seeder
seedData(); 