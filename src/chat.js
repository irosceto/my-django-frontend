import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './chat.css'; // chat.css dosyasını import et

const ChatRooms = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const [newRoomName, setNewRoomName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Sunucudan sohbet odalarını al
    fetchChatRooms();
  }, []);

  const fetchChatRooms = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/chat_rooms/');
      setChatRooms(response.data);
    } catch (error) {
      console.error('Sohbet odaları alınırken hata oluştu:', error);
    }
  };

  const createRoom = async () => {
    try {
      if (!newRoomName) {
        setError('Oda adı boş olamaz');
        return;
      }
      const response = await axios.post('http://localhost:8000/api/create_chat_room/', { name: newRoomName });
      setNewRoomName('');
      fetchChatRooms(); // Sohbet odalarını güncelle
      // Yeni oda oluşturulduğunda, oluşturulan odanın bilgilerini alarak listeye ekleyelim
      setChatRooms(prevChatRooms => [...prevChatRooms, response.data]);
    } catch (error) {
      setError('Oda oluşturulurken hata oluştu');
      console.error('Oda oluşturulurken hata oluştu:', error);
    }
  };

  return (
    <div>
      <div className="top_div"> {/* .top_div sınıfını ekleyin */}
        <div className="profile"></div>
      </div>

      <div className="container"> {/* .container sınıfını ekleyin */}
        <div className="chat-rooms">
          <h2>Sohbet Odaları</h2>
          <ul>
            {chatRooms.map(room => (
              <li key={room.id}>{room.name}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="third_div"> {/* .third_div sınıfını ekleyin */}
        <button className="join_button">+</button>
        <p className="join_text">KATIL</p>
        <input
          type="text"
          value={newRoomName}
          onChange={(e) => setNewRoomName(e.target.value)}
          placeholder="Oda adını girin"
        />
        <button className="create_button" onClick={createRoom}>+</button> {/* onClick işleyicisini ekleyin */}
        <p className="create_text">OLUŞTUR</p>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ChatRooms;
