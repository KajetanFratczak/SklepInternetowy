import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const mockUsers = [
        { username: "user1", password: "password1" },
        { username: "user2", password: "password2" },
        { username: "admin", password: "admin123" },
      ];

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        const user = mockUsers.find((u) => u.username === username && u.password === password);
        
        if (user)
        {
            localStorage.setItem("loggedUser", JSON.stringify(user));
            setError("");
            navigate("/");
        }
        else
        {
            setError("Invalid username or password");
        }
    };

    return (
        <div className='login-page'>
            <h1>Logowanie</h1>
            <input type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}></input>
            <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <h2>{error}</h2>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;