const mongoose = require('mongoose');
const axios = require('axios');
const Product = require('../models/product');
const User = require('../models/user');
const Order = require('../models/order');
const Review = require('../models/review');
require('dotenv').config();

async function seedDatabase() {
    try {
        // Połączenie z bazą danych
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Czyszczenie istniejących danych
        await Product.deleteMany({});
        await User.deleteMany({});
        await Order.deleteMany({});
        await Review.deleteMany({});

        // Pobieranie wszystkich produktów z FakeStoreAPI
        const response = await axios.get('https://fakestoreapi.com/products');
        const products = response.data;

        // Zapisywanie produktów w bazie
        const savedProducts = await Product.insertMany(products);
        console.log('Products seeded successfully');

        // Tworzenie przykładowych użytkowników
        const users = [
            {
                id: 1,
                username: 'admin',
                email: 'admin@example.com',
                password: 'admin123',
                role: 'admin'
            },
            {
                id: 2,
                username: 'user1',
                email: 'user1@example.com',
                password: 'user123',
                role: 'user'
            }
        ];

        const savedUsers = await User.insertMany(users);
        console.log('Users seeded successfully');

        // Mockowane dane zamówień
        const mockOrders = [
            {
                id: 1,
                userId: 1, 
                orderId: 1,
                date: "2025-01-16",
                products: [{ 
                    productId: 1,
                    title: "Fjallraven - Foldsack No. 1 Backpack",
                    price: 109.95,
                    quantity: 3
                }],
                totalPrice: 329.85,
                status: "in-progress"
            },
            {
                id: 2,
                userId: 2,
                orderId: 2,
                date: "2025-01-15",
                products: [{ 
                    productId: 1,
                    title: "Fjallraven - Foldsack No. 1 Backpack",
                    price: 109.95,
                    quantity: 1
                }],
                totalPrice: 109.95,
                status: "completed"
            }
        ];
        await Order.insertMany(mockOrders);
        console.log('Orders seeded successfully');

        // Mockowane dane recenzji
        const mockReviews = [
            {
                id: 1,
                userId: 2, 
                productId: 1,
                date: "2025-01-15",
                username: "user1",
                rating: 4,
                email: "user1@example.com",
                message: "Świetny produkt, polecam gorąco!"
            },
            {
                id: 2,
                userId: 1, 
                productId: 1,
                date: "2025-01-16",
                username: "admin",
                rating: 1,
                email: "admin@example.com",
                message: "Słaby produkt, odradzam zakup!"
            }
        ];

        await Review.insertMany(mockReviews);
        console.log('Reviews seeded successfully');

    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await mongoose.disconnect();
    }
}

// Uruchomienie skryptu
seedDatabase();
