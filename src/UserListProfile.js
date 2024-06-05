import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserListProfile = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('/api/users/') // Kullanıcı listesi API'sinin URL'sini ayarlayın
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleUserClick = (username) => {
        axios.get(`/api/profile/${username}/`) // Kullanıcı profili API'sinin URL'sini ayarlayın
            .then(response => {
                // Kullanıcı profili verilerini kullanarak istediğiniz şekilde işlem yapın
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div>
            <h2>User List</h2>
            <ul>
                {users.map(user => (
                    <li key={user.username} onClick={() => handleUserClick(user.username)}>
                        {user.username}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserListProfile;
