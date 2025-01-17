// models/product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true // Zapewnia unikalność identyfikatora
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
    timestamps: true, // Dodaje automatycznie pola createdAt i updatedAt
    _id: false // Wyłącza automatyczne tworzenie pola _id
});

// Metoda do aktualizacji oceny produktu
productSchema.methods.updateRating = async function(newRating) {
    const currentCount = this.rating.count;
    const currentRate = this.rating.rate;
    
    // Oblicz nową średnią ocenę
    const newCount = currentCount + 1;
    const newRate = ((currentRate * currentCount) + newRating) / newCount;
    
    this.rating.count = newCount;
    this.rating.rate = Number(newRate.toFixed(1));
    
    await this.save();
};

const Product = mongoose.model('Product', productSchema);
module.exports = Product;