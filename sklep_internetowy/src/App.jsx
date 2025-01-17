//Główny komponent aplikacji, który renderuje inne komponenty i zarządza strukturą aplikacji.
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Register from "./components/Register";
import OrderHistory from "./components/OrderHistory";
import Profile from "./components/Profile";
import NoPage from "./components/NoPage";
import './App.css'

function App() 
{
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<ProductDetails />} />
            <Route path="cart" element={<ProtectedRoute><Cart /></ProtectedRoute>}/>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="orders" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
            <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;