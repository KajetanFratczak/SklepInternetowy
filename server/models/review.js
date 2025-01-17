//Definicja schematu Mongoose dla kolekcji Review w bazie danych MongoDB.
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    userId: {
        type: Number,
        required: true
    },
    productId: {
        type: Number,
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
    timestamps: true,
    _id: false
});

// Indeks złożony zapewniający, że użytkownik może dodać tylko jedną opinię do produktu
reviewSchema.index({ userId: 1, productId: 1 }, { unique: true });

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;