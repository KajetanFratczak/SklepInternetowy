//Komponent Cart, który odpowiada za wyświetlanie zawartości koszyka, zarządzanie jego elementami oraz składanie zamówienia.
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { saveOrder } from '../mocks/orders';
import {useAuth} from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { cartItems, removeFromCart, clearCart, getCartTotal } = useContext(CartContext);
  const { user } = useAuth();

  const handleCheckout = () => {
    if (cartItems.length === 0){
      alert('Koszyk jest pusty!');
      return;
    }

    const newOrder = {
      userId: user.id,
      date: new Date().toISOString().split('T')[0],
      products: cartItems,
      totalPrice: getCartTotal()
    };

    saveOrder(newOrder);
    clearCart();
    alert('Zamówienie zostało przyjęte do realizacji!');
    navigate('/orders');
  };

  return (
    <div className="cart">
      <h1>Twój Koszyk</h1>
      {cartItems.length === 0 ? (
        <p>Koszyk jest pusty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <div>
                  <h4>{item.title}</h4>
                  <p>Cena: {item.price} zł</p>
                  <p>Ilość: {item.quantity}</p>
                  <p>Suma: {(item.price * item.quantity).toFixed(2)} zł</p>
                </div>
                <button onClick={() => removeFromCart(item)}>Usuń</button>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <h2>Suma: {getCartTotal().toFixed(2)} zł</h2>
            <button onClick={clearCart}>Wyczyść koszyk</button>
            <button onClick={handleCheckout} className='checkout-button'>Złóż zamówienie</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;