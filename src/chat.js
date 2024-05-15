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
      console.error('Error fetching chat rooms:', error);
    }
  };

  const createRoom = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/create_chat_room/', { name: newRoomName });
      setNewRoomName('');
      fetchChatRooms(); // Sohbet odalarını güncelle
    } catch (error) {
      setError('Error creating room');
      console.error('Error creating room:', error);
    }
  };

  return (
    <div>
      <div className="top_div"> {/* .top_div sınıfını ekleyin */}
        <div className="profile"></div>
      </div>

      <div className="container"> {/* .container sınıfını ekleyin */}
        <div className="chat-rooms">
          <h2>Chat Rooms</h2>
          <ul>
            {chatRooms.map(room => (
              <li key={room.id}>{room.name}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="third_div"> {/* .third_div sınıfını ekleyin */}
        <button className="join_button">+</button>
        <p className="join_text">JOIN</p>
        <button className="create_button">+</button>
        <p className="create_text">CREATE</p>
      </div>
    </div>
  );
};

export default ChatRooms;
