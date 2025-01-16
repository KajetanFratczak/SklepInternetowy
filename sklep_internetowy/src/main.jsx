import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {CartProvider} from './context/Cart'
import {initializeMockUsers} from './mocks/users.js'
import { initializeMockOrders } from './mocks/orders.js'

initializeMockUsers();
initializeMockOrders();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <App/>
    </CartProvider>
  </StrictMode>,
)
