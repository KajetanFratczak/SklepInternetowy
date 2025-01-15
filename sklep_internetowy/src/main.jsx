import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {CartProvider} from './context/Cart'
import {initializeMockUsers} from './mocks/users.js'

initializeMockUsers();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <App/>
    </CartProvider>
  </StrictMode>,
)
