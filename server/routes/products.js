// routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const { auth } = require('../middleware/auth');

// Pobierz wszystkie produkty
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Błąd podczas pobierania produktów' });
  }
});

// Pobierz pojedynczy produkt
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findOne({id: req.params.id});
    if (!product) {
      return res.status(404).json({ error: 'Produkt nie został znaleziony' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Błąd podczas pobierania produktu' });
  }
});

// Dodaj nowy produkt (tylko admin)
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Brak uprawnień' });
    }
    
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: 'Błąd podczas dodawania produktu' });
  }
});

module.exports = router;