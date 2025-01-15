import React from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {

    const {user} = useAuth();

    if (!user) {
        return <div>Zaloguj się aby zobaczyć swój profil.</div>;
    }

    return (
        <div className="profile-page">
            <h1>Mój profil</h1>
            <div className="profile-info">
                <p><strong>Nazwa użytkownika:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Rola:</strong> {user.role}</p>
            </div>
        </div>
    );
};

export default Profile;