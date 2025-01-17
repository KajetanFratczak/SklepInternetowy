//Komponent AuthProvider tworzy kontekst, który zarządza autentykacją użytkownika w aplikacji.
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const login = (username, password) => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const user = storedUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      setUser(user);
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      return { success: true };
    }
    return { success: false, error: 'Niepoprawny login lub hasło' };
  };

  const register = (username, email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    if (users.length === 0) {
      users.push({
        username: 'admin',
        password: 'admin123',
        email: 'admin@example.com',
        role: 'admin'
      });
    }

    const isUserExist = users.find((user) => user.username === username);
    if (isUserExist) {
      return { success: false, error: 'Nazwa użytkownika jest już zajęta.' };
    }

    const newUser = { username, password, email, role: 'user' };
    const updatedUsers = [...users, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };

  const requireAuth = (Component) => {
    if (!user) {
      navigate('/login');
      return null;
    }
    return Component;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, requireAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);