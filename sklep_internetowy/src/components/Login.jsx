import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        const user = storedUsers.find((u) => u.username === username && u.password === password);
      
        if (user) 
        {
          localStorage.setItem("loggedInUser", JSON.stringify(user));
          setError("");
          navigate("/");
        } 
        else 
        {
          setError("Niepoprawny login lub hasło");
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