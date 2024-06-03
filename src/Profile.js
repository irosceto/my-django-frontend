import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = ({ accessToken }) => {
    console.log('accessToken değişti:', accessToken);

    const [username, setUsername] = useState('');

    useEffect(() => {
        if (accessToken) {
            axios.get('http://localhost:8000/api/user_profile/', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            .then(response => {
                setUsername(response.data.username);
            })
            .catch(error => {
                console.error('Error fetching user profile:', error);
            });
        }
    }, [accessToken]);

    return (
        <div>
            <h2>Profil Sayfası</h2>
            <p>Kullanıcı Adı: {username}</p>
        </div>
    );
};

export default Profile;
