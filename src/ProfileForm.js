import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserProfile() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        axios.get('/api/profile_edit/')
            .then(response => {
                setUserData(response.data);
            })
            .catch(error => {
                console.error('Error fetching user profile:', error);
            });
    }, []);

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>User Profile</h2>
            <p>Username: {userData.user.username}</p>
            <p>Email: {userData.email}</p>
            {userData.profile_picture && (
                <img src={userData.profile_picture} alt="Profile Picture" />
            )}
            {/* Diğer profil bilgilerini de buraya ekleyebilirsiniz */}
        </div>
    );
}

export default UserProfile;