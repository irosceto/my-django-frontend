import React, { useState, useEffect, useRef } from 'react';


const ChatRoom = ({ chatRoomId, accessToken }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const socket = useRef(null);
  const [roomUsers, setRoomUsers] = useState([]);
  const [error, setError] = useState('');
  

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
        console.log("data", data); // Bu satırı ekleyin
        if (data.sender != "Anonymous")
          setMessages(prevMessages => [...prevMessages, { sender: data.sender, content: data.content }]);
      };
      

      socket.current.onclose = () => {
        console.log('WebSocket connection closed, attempting to reconnect...');
        setTimeout(connectWebSocket, 3000); // Attempt to reconnect after 3 seconds
      };

      socket.current.onerror = (error) => {
        console.error('WebSocket error', error);
      };
    };

    connectWebSocket();

    // Cleanup WebSocket connection on component unmount
    return () => {
      if (socket.current) {
        socket.current.close();
      }
    };
  }, [accessToken, chatRoomId]); // Dependencies include accessToken and chatRoomId

  const sendMessage = () => {
    if (socket.current && socket.current.readyState === WebSocket.OPEN) {
      socket.current.send(JSON.stringify({ message: inputMessage }));
      setInputMessage('');
      fetchRoomUsers(); // Call fetchRoomUsers after sending a message
    }
  };

  const fetchRoomUsers = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/chat_rooms/${chatRoomId}/members/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });

      console.log("Constresponse", response);
      const text = await response.text(); // Yanıtı JSON olarak işlemeye çalışmadan önce metin olarak alalım
      console.log("Response Text:", text);

      
      const data = JSON.parse(text); // JSON.parse kullanarak yanıtı JSON'a çevirelim
      console.log("Response Data:", data);
      setRoomUsers(data);
    } catch (error) {
      console.error('Error fetching room users:', error.message);
    }
};


  return (
    <div className="chat-room-container">
      <div className="top_div">
        <div className="profile">
          
        </div>
        
      </div>
      <div className="container">
  {messages.map((message, index) => {
    let showSender = true;
    if (index > 0) {
      for (let i = index - 1; i >= 0; i--) {
        if (messages[i].sender === message.sender) {
          showSender = false;
          break;
        }
      }
    }
    return (
      <div key={index} className={`message ${message.sender === 'me' ? 'sent' : 'received'}`}>
        {showSender && <span className="sender">{String(message.sender)}</span>}
       
      </div>
    );
  })}
</div>


      <div className="third_div">
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
          <button onClick={sendMessage}>Gönder</button>
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </div>
    </div>
  );
};

export default ChatRoom;
