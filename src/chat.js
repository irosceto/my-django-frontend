import React, { useState } from 'react';
import axios from 'axios';

const ChatRooms = () => {
  const [roomName, setRoomName] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (!roomName) {
      setError('Oda adı boş olamaz');
      return;
    }
    // Kullanıcının kimliğini localStorage'dan al
    const userId = localStorage.getItem('user_id');
    const members = [userId]; // Tek kullanıcı kimliğini bir liste olarak al
    // Axios isteği ile yeni bir sohbet odası oluşturuluyor
    const response = await axios.post('http://localhost:8000/api/create_chat_room/', {
      name: roomName,
      members: members // Oluşturan kullanıcıyı sohbet odası üyelerine ekle
    });
    // Yeni oda oluşturulduğunda sayfayı yenilemek veya başka bir işlem yapmak gerekebilir
    // Burada sadece formu sıfırlıyoruz
    setRoomName('');
    setError(null);
  } catch (error) {
    if (error.response) {
      // Sunucudan dönen hata varsa
      setError(error.response.data.detail);
    } else {
      // Sunucudan dönen bir hata yoksa
      setError('Oda oluşturulurken bir hata oluştu');
    }
  }
};
  return (
    <div>
      <h2>Yeni Sohbet Odası Oluştur</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Oda Adı:</label>
          <input type="text" value={roomName} onChange={(e) => setRoomName(e.target.value)} />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit">Oda Oluştur</button>
      </form>
    </div>
  );
};

export default ChatRooms;

