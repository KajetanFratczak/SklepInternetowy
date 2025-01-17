//Definicja schematu Mongoose dla kolekcji Order w bazie danych MongoDB.
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    userId: {
        type: Number,
        required: true,
    },
    orderId: {
        type: Number,
        required: true,
        unique: true 
    },
    date: {
        type: Date,
        required: true,
        default: Date.now 
    },
    products: [
        {
            productId: { 
                type: Number, 
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
        enum: ['in-progress', 'completed', 'cancelled'], 
        default: 'in-progress'
    }
}, {
    timestamps: true, 
    _id: false
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;