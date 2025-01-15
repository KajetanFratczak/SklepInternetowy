import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from '../context/Cart';
import SingleProduct from './SingleProduct';

const Products = () => {

    const apiURL = "https://fakestoreapi.com/products";

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const { addToCart } = useContext(CartContext);
    
    useEffect(() => {
        fetch(apiURL)
            .then((response) => response.json())
            .then((data) => setProducts(data))

    }, []);

    useEffect(() => {
        const uniqueCategories = ['all', ...new Set(products.map(product => product.category))];
        setCategories(uniqueCategories)
    }, [products]);

    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(product => product.category === selectedCategory);

    return (
      <div className="product-page">
        {/* Filtr kategorii */}
        <div className="category-filter">
            <label htmlFor="category-select">Filtruj według kategorii: </label>
            <select
                id="category-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
            >
                {categories.map(category => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
        </div>

        {/* Lista produktów */}
        <div className="product-list">
            {filteredProducts.map(product => (
                <SingleProduct key={product.id} product={product} addToCart={addToCart} />
            ))}
        </div>
      </div>
    );
};

export default Products;