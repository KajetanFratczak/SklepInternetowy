import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/Cart';
import ProductReview from './ProductReview';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useContext(CartContext);
    
    const apiURL = `https://fakestoreapi.com/products/${id}`;

    useEffect(() => {
        setLoading(true);
        fetch(apiURL)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Nie udało się pobrać produktu');
                }
                return response.json();
            })
            .then((data) => {
                setProduct(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div className="loading">Ładowanie szczegółów produktu...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!product) {
        return <div className="error">Nie znaleziono produktu</div>;
    }
 
    return (
        <div className='product-details'>
            <h2>{product.title}</h2>
            <img src={product.image} className='product-img' alt={product.title}/>
            <p>Kategoria: {product.category}</p>
            <p>Opis: {product.description}</p>
            <p>Cena: {product.price} zł</p>
            <button 
                onClick={() => addToCart(product)}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginBottom: '20px'
                }}
            >
                Dodaj do koszyka
            </button>
            <ProductReview productId={parseInt(id)} />
        </div>
    );
};

export default ProductDetails;