// Definicja route-ów Express.js do zarządzania użytkownikami w aplikacji.
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

// Rejestracja użytkownika
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const userExists = await User.findOne({ $or: [{ username }, { email }] });
        if (userExists) {
            return res.status(400).json({ error: 'Nazwa użytkownika lub email jest już zajęta.' });
        }

        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json({ success: true, message: 'Rejestracja przebiegła pomyślnie.' });
    } catch (error) {
        res.status(500).json({ error: 'Błąd podczas rejestracji użytkownika.' });
    }
});

// Logowanie użytkownika
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: 'Użytkownik nie znaleziony.' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Błędne hasło.' });
        }

        const token = jwt.sign({ userId: user._id, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ success: true, token });
    } catch (error) {
        res.status(500).json({ error: 'Błąd podczas logowania użytkownika.' });
    }
});

module.exports = router;
