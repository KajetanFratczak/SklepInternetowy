//Definicja schematu Mongoose dla kolekcji Product w bazie danych MongoDB.
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true 
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true
    },
    rating: {
        rate: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },
        count: {
            type: Number,
            default: 0,
            min: 0
        }
    },
    stock: {
        type: Number,
        default: 100,
        min: 0
    }
}, {
    timestamps: true, 
    _id: false 
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;