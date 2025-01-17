//Komponent Login, który umożliwia użytkownikowi logowanie do aplikacji.
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = () => {
        if (!username || !password) {
          setError('Wszystkie pola są wymagane.');
          return;
        }
    
        const result = login(username, password);
        if (result.success) {
          setError('');
          navigate('/');
        } else {
          setError(result.error);
        }
    };

    return (
        <div className='login-page'>
            <h1>Logowanie</h1>
            <input type='text' placeholder='Login' value={username} onChange={(e) => setUsername(e.target.value)}></input>
            <input type='password' placeholder='Hasło' value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <h2>{error}</h2>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;