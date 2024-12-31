import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from '../context/Cart';

const Products = () => {

    const apiURL = "https://fakestoreapi.com/products";

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState({});
    const { cartItems, addToCart } = useContext(CartContext);
    
    useEffect(() => {
        fetch(apiURL)
            .then((response) => response.json())
            .then((data) => setProducts(data))
    }, []);


    return (
        <div className="product-page">
          {products.map(product => (
            <div key={product.id} className="product">
              <h4>{product.title}</h4>
              <img src={product.image} className='product-img'></img>
              <p>{product.description}</p>
              <p>{product.price} zł</p>
              <button onClick={() => addToCart(product)}>Add to cart</button>
            </div>
          ))}
        </div>
    );
};

export default Products;