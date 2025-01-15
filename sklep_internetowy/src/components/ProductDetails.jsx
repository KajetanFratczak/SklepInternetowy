import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/Cart';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { addToCart } = useContext(CartContext);
    
    const apiURL = `https://fakestoreapi.com/products/${id}`;

    useEffect(() => {
        fetch(apiURL)
            .then((response) => response.json())
            .then((data) => setProduct(data));
    }, [id]);

    // Dodanie sprawdzenia, czy produkt jest załadowany - bez tego się wywala 
    if (!product) {
        return <p>Ładowanie szczegółów produktu...</p>;
    }
 
    return (
        <div className='product-details'>
            <h2>{product.title}</h2>
            <img src={product.image} className='product-img' alt={product.title}/>
            <p>Kategoria: {product.category}</p>
            <p>Opis: {product.description}</p>
            <p>Cena: {product.price} zł</p>
            <button onClick={() => addToCart(product)}>Dodaj do koszyka</button>
        </div>
    );
};

export default ProductDetails;