const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderId: {
        type: Number,
        required: true,
        unique: true // Zapewnia unikalność identyfikatora zamówienia
    },
    date: {
        type: Date,
        required: true,
        default: Date.now // Automatycznie ustawia datę na bieżący czas
    },
    products: [
        {
            productId: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Product',
                required: true 
            },
            title: { 
                type: String, 
                required: true 
            },
            price: { 
                type: Number, 
                required: true 
            },
            quantity: { 
                type: Number, 
                required: true 
            }
        }
    ],
    totalPrice: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        required: true,
        enum: ['in-progress', 'completed', 'cancelled'], // Dozwolone statusy
        default: 'in-progress'
    }
}, {
    timestamps: true // Automatycznie dodaje pola `createdAt` i `updatedAt`
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;