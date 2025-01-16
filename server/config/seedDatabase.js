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

        // Pobieranie produktów z FakeStoreAPI
        const response = await axios.get('https://fakestoreapi.com/products');
        const products = response.data.map(product => ({
            ...product,
            stock: Math.floor(Math.random() * 100) + 20 // Dodajemy losową ilość produktów na stanie (20-120)
        }));

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
                userId: savedUsers[0]._id, // Poprawiono na ObjectId użytkownika
                orderId: 1,
                date: "2025-01-16",
                products: [{ 
                    productId: savedProducts[0]._id,
                    title: "Fjallraven - Foldsack No. 1 Backpack",
                    price: 109.95,
                    quantity: 3
                }],
                totalPrice: 329.85,
                status: "in-progress"
            },
            {
                userId: savedUsers[1]._id, // Poprawiono na ObjectId użytkownika
                orderId: 2,
                date: "2025-01-15",
                products: [{ 
                    productId: savedProducts[0]._id,
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
                userId: savedUsers[1]._id, // Poprawiono na ObjectId użytkownika
                productId: savedProducts[0]._id,
                date: "2025-01-15",
                username: "user1",
                rating: 4,
                email: "user1@example.com",
                message: "Świetny produkt, polecam gorąco!"
            },
            {
                userId: savedUsers[0]._id, // Poprawiono na ObjectId użytkownika
                productId: savedProducts[0]._id,
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
