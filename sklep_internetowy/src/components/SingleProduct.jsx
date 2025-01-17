//Komponent SingleProduct jest odpowiedzialny za wyświetlanie pojedynczego produktu w liście produktów.
import React from 'react';
import { Link } from 'react-router-dom';

const SingleProduct = ({product, addToCart}) => {
    return (
        <div className='product'>

            <Link to={`/products/${product.id}`} style={{textDecoration: 'none', color: 'inherit'}}><h4>{product.title}</h4>
            <img src={product.image} className='product-img'/>
            <p>{product.price} zł</p></Link>
            <button onClick={() => addToCart(product)}>Dodaj do koszyka</button>
        </div>
    );
};

export default SingleProduct;