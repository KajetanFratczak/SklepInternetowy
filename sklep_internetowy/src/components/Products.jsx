import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from '../context/Cart';
import SingleProduct from './SingleProduct';
import { api } from '../utils/api';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useContext(CartContext);
    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = await api.getAllProducts();
                setProducts(data);
                const uniqueCategories = ['all', ...new Set(data.map(product => product.category))];
                setCategories(uniqueCategories);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <div>Ładowanie produktów...</div>;
    if (error) return <div>Błąd: {error}</div>;

    const filteredProducts = products
        .filter(product => selectedCategory === 'all' || product.category === selectedCategory)
        .filter(product => product.title.toLowerCase().includes(searchText.toLowerCase()));

    return (
        <div className="product-page">
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

            <div className="search-filter">
                <label htmlFor="search-text">Szukaj produktu po nazwie: </label>
                <input
                    id="search-text"
                    type='text'
                    placeholder='Wpisz nazwę produktu...'
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </div>

            <div className="product-list">
                {filteredProducts.map(product => (
                    <SingleProduct key={product.id} product={product} addToCart={addToCart} />
                ))}
            </div>
        </div>
    );
};

export default Products;