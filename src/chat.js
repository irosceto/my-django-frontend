import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './chat.css';
import { Link } from 'react-router-dom';

const Chat = ({ accessToken }) => {
  const [roomName, setRoomName] = useState('');
  const [error, setError] = useState(null);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/chat_rooms/', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        setRooms(response.data);
      } catch (error) {
        setError('Sohbet odaları alınırken bir hata oluştu');
      }
    };

    fetchChatRooms();
  }, [accessToken]);

  const handleCreateRoom = async () => {
    try {
      if (!accessToken) {
        setError('Token eksik');
        return;
      }
      const response = await axios.post('http://localhost:8000/api/chat_rooms/create/', {
        name: roomName,
      }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      setRoomName('');
      setRooms([...rooms, response.data]);
      setError(null);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
      } else {
        setError('Oda oluşturulurken bir hata oluştu');
      }
    }
  };

  return (
    <div>
      <div>
        <Link to='/profile'>Profil Sayfasi</Link>
      </div>
    <div className="chat-container">
      <div className="top_div">
        {/* İlgili HTML içeriği buraya gelecek */}
      </div>
      <div className="container">
        {/* İlgili HTML içeriği buraya gelecek */}
      </div>
      <div className="third_div">
        <div className="chat-left">
          <div className="create-room">
            <input
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="Oda adı girin"
            />
            <button onClick={handleCreateRoom}>Oluştur</button>
          </div>
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
        <div className="chat-right">
          <h3>Oluşturulan Odalar</h3>
          <ul>
            {rooms.map(room => (
              <li key={room.id}>
                <Link to={`/chat/${room.id}`}>
                  {room.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Chat;

