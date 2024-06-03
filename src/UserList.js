import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = ({ onUserClick }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Kullanıcıları getirmek için bir HTTP GET isteği yap
    axios.get('http://localhost:8000/api/users/')
      .then(response => {
        // Gelen kullanıcı verilerini al ve state'e kaydet
        setUsers(response.data);
      })
      .catch(error => {
        // Hata durumunda konsola hata mesajını yazdır
        console.error('Error fetching users:', error);
      });
  }, []); // Bu etkileşim yalnızca bileşen yüklendiğinde bir kez gerçekleşmelidir

  return (
    <div className="user-list">
      <h2>Kullanıcılar</h2>
      <ul>
        {users.map(user => (
          <li key={user.id} onClick={() => onUserClick(user.accessToken)}>
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
