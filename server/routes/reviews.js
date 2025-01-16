// Operacje CRUD:

// GET: Pobranie opinii dla danego produktu.
// POST: Dodanie nowej opinii.
// PUT: Aktualizacja istniejącej opinii.
// DELETE: Usunięcie opinii.

const express = require('express');
const router = express.Router();
const Review = require('../models/review');
const { auth, isAdmin } = require('../middleware/auth');

// Pobierz opinie dla konkretnego produktu
router.get('/:productId', async (req, res) => {
    try {
        const { productId } = req.params;
        const reviews = await Review.find({ productId }).sort({ createdAt: -1 });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: 'Błąd podczas pobierania opinii.' });
    }
});

// Dodaj nową opinię
router.post('/', auth, async (req, res) => {
    try {
        const { productId, rating, message } = req.body;
        const userId = req.user.id;
        const email = req.user.email;

        if (!rating || !message) {
            return res.status(400).json({ error: 'Ocena i treść opinii są wymagane.' });
        }

        const newReview = new Review({
            productId,
            userId,
            rating,
            message,
            email
        });

        await newReview.save();
        res.status(201).json({ success: true, message: 'Opinia została dodana.' });
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ error: 'Możesz dodać tylko jedną opinię do tego produktu.' });
        } else {
            res.status(500).json({ error: 'Błąd podczas dodawania opinii.' });
        }
    }
});

// Usuń opinię
router.delete('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.findById(id);

        if (!review) {
            return res.status(404).json({ error: 'Opinia nie została znaleziona.' });
        }

        if (review.userId.toString() !== req.user.id && !req.user.isAdmin) {
            return res.status(403).json({ error: 'Nie masz uprawnień do usunięcia tej opinii.' });
        }

        await Review.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Opinia została usunięta.' });
    } catch (error) {
        res.status(500).json({ error: 'Błąd podczas usuwania opinii.' });
    }
});

// Zaktualizuj opinię
router.put('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { rating, message } = req.body;

        if (!rating || !message) {
            return res.status(400).json({ error: 'Ocena i treść opinii są wymagane.' });
        }

        const review = await Review.findById(id);

        if (!review) {
            return res.status(404).json({ error: 'Opinia nie została znaleziona.' });
        }

        if (review.userId.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Nie masz uprawnień do edytowania tej opinii.' });
        }

        review.rating = rating;
        review.message = message;
        await review.save();

        res.status(200).json({ success: true, message: 'Opinia została zaktualizowana.' });
    } catch (error) {
        res.status(500).json({ error: 'Błąd podczas aktualizowania opinii.' });
    }
});

module.exports = router;
