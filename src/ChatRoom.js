import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './chatroom.css'; 

const ChatRoom = ({ chatRoomId, accessToken, profilePicture }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const socket = useRef(null);
  const [roomUsers, setRoomUsers] = useState([]);
  const [members, setMembers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      console.error('Access token is undefined');
      return;
    }

    const connectWebSocket = () => {
      if (socket.current && (socket.current.readyState === WebSocket.OPEN || socket.current.readyState === WebSocket.CONNECTING)) {
        console.log("WebSocket is already open or connecting");
        return;
      }

      socket.current = new WebSocket(`ws://localhost:8000/ws/chat/${chatRoomId}/?access_token=${accessToken}`);

      socket.current.onopen = () => {
        console.log('WebSocket connected');
      };

      socket.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("data", data);
        if (data.sender !== "Anonymous")
          setMessages(prevMessages => [...prevMessages, { sender: data.sender, content: data.content }]);
      };

      socket.current.onclose = () => {
        console.log('WebSocket connection closed, attempting to reconnect...');
        setTimeout(connectWebSocket, 3000);
      };

      socket.current.onerror = (error) => {
        console.error('WebSocket error', error);
      };
    };

    connectWebSocket();

    return () => {
      if (socket.current) {
        socket.current.close();
      }
    };
  }, [accessToken, chatRoomId]);

  const sendMessage = () => {
    if (socket.current && socket.current.readyState === WebSocket.OPEN) {
      socket.current.send(JSON.stringify({ message: inputMessage }));
      setInputMessage('');
      fetchRoomUsers();
    }
  };

  const fetchRoomUsers = async () => {
    try {
      const response = await fetch(`/api/chat_rooms/${chatRoomId}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch room users');
      }

      const data = await response.json();
      setMembers(data);
    } catch (error) {
      console.error('Error fetching room users:', error);
      setError('Oda kullanıcıları alınırken hata: ' + error.message);
    }
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <div className="chat-room-container">
      <div className="topbox_div">
        <div className="profile" onClick={handleProfileClick} style={{ cursor: 'pointer' }}>
          {profilePicture && <img src={`http://localhost:8000${profilePicture}`} alt="Profil Resmi" />}
        </div>
      </div>
      <div className="containerbox">
        <h2>Oda Kullanıcıları</h2>
        <ul>
          {members.map((member, index) => (
            <li key={index}>{member}</li>
          ))}
        </ul>
      </div>
      <div className="thirdbox_div">
        <div className="messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender === 'me' ? 'sent' : 'received'}`}>
              <span className="sender">{String(message.sender)}:</span>
              <span className="content">{String(message.content)}</span>
            </div>
          ))}
        </div>

        <div className="input-container">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Mesajınızı yazın"
          />
          <button className='buttonsend' onClick={sendMessage}>Gönder</button>
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </div>
    </div>
  );
};

export default ChatRoom;
