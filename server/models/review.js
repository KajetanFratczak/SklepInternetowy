// models/review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    message: {
        type: String,
        required: true,
        minLength: 10
    },
    email: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// Indeks złożony zapewniający, że użytkownik może dodać tylko jedną opinię do produktu
reviewSchema.index({ userId: 1, productId: 1 }, { unique: true });

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;