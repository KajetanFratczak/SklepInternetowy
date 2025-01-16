import React from 'react';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const OrderHistory = () => {

    const [orders, setOrders] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const fetchOrders = () => {
            const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
            const userOrders = storedOrders.filter(order => order.userId === user.id);
            const sortedOrders = userOrders.sort((a, b) => b.orderId - a.orderId);
            setOrders(sortedOrders); 
        };

        if (user){
            fetchOrders();
        }
        
    }, [user]);

    const formatStatus = (status) => {
        switch(status) {
            case 'in-progress':
                return 'W trakcie realizacji';
            case 'completed':
                return 'Zrealizowane';
            default:
                return status;
        }
    };

    return (
        <div className='order-history'>
            <h1>Historia zamówień</h1>
            {orders.length === 0 ? (
                <p>Brak zamówień w historii.</p>
            ) : (
                <div className='orders-list'>
                    {orders.map((order) => (
                        <div key={order.id} className='order-item'>
                            <div className='order-header'>
                                <h3>Zamówienie #{order.orderId}</h3>
                                <p>Data: {order.date}</p>
                                <p>Status: {formatStatus(order.status)}</p>
                                <p>Kwota: {order.totalPrice.toFixed(2)} zł</p>
                            </div>
                            <div className='order-products'>
                                <h4>Produkty:</h4>
                                <ul>
                                    {order.products.map((product) => (
                                        <li key={product.id}>{product.title} - {product.quantity} szt. x {product.price} zł</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>    
            )} 
        </div>
    );
};

export default OrderHistory;