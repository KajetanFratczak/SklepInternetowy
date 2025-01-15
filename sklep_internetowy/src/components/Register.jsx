import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = () => {
        if (!username || !password || !email)
        {
            setError("Wszystkie pola są wymagane.");
            return;
        }
        
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const isUserExist = users.find((user) => user.username === username);

        if (isUserExist) {
        setError("Nazwa użytkownika jest już zajęta.");
        return;
        }

        const newUser = { username, password, email };
        const updatedUsers = [...users, newUser];
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        navigate("/login");
    };

    return (
        <div className='register-page'>
            <h1>Rejestracja</h1>
            <input type='text' placeholder='Login' value={username} onChange={(e) => setUsername(e.target.value)}></input>
            <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
            <input type='password' placeholder='Hasło' value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <h2>{error}</h2>
            <button onClick={handleRegister}>Register</button>
        </div>
    );
};

export default Register;