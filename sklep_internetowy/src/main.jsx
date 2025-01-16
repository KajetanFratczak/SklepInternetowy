import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {CartProvider} from './context/Cart'
import {initializeMockUsers} from './mocks/users.js'
import { initializeMockOrders } from './mocks/orders.js'
import { initializeMockReviews } from './mocks/reviews.js'

initializeMockUsers();
initializeMockOrders();
initializeMockReviews();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <App/>
    </CartProvider>
  </StrictMode>,
)
