import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';


const ChatRoom = ({ chatRoomId, accessToken }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const socket = useRef(null);

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
        const message = JSON.parse(event.data);
        setMessages(prevMessages => [...prevMessages, message]);
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
    }
  };

return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg.content}</div>
        ))}
      </div>
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        style={{ marginTop: '50px' }} // Burada üst boşluk ekleniyor
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatRoom;
