import React, { useContext } from 'react';
import { CartContext } from '../context/Cart';

function Cart() {
  const { cartItems, removeFromCart, clearCart, getCartTotal } = useContext(CartContext);

  return (
    <div className="cart">
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <div>
                  <h4>{item.title}</h4>
                  <p>Price: {item.price} zł</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Total: {item.price * item.quantity} zł</p>
                </div>
                <button onClick={() => removeFromCart(item)}>Remove</button>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <h2>Total: {getCartTotal()} zł</h2>
            <button onClick={clearCart}>Clear Cart</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;