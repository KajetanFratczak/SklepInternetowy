const express = require('express');
const Order = require('../models/order');
const { auth } = require('../middleware/auth');
const router = express.Router();

// Pobieranie historii zamówień dla użytkownika
router.get('/history', auth, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.userId })
            .populate('products.productId') // Pobieramy dane o produktach (np. tytuł, cena)
            .sort({ date: -1 }); // Sortowanie zamówień od najnowszych
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Błąd podczas pobierania historii zamówień.' });
    }
});

// Tworzenie nowego zamówienia
router.post('/create', auth, async (req, res) => {
    const { products, totalPrice } = req.body;
    
    if (!products || !totalPrice || totalPrice <= 0) {
        return res.status(400).json({ error: 'Nieprawidłowe dane zamówienia.' });
    }

    try {
        const orderCount = await Order.countDocuments();
        const newOrder = new Order({
            userId: req.user.userId,
            orderId: orderCount + 1, // Unikalny identyfikator zamówienia
            products,
            totalPrice,
            status: 'in-progress'
        });

        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ error: 'Błąd podczas tworzenia zamówienia.' });
    }
});

module.exports = router;
