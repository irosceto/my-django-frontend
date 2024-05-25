import React, { useState, useEffect, useRef } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const ChatRoom = ({ chatRoomId }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const client = useRef(null);

  useEffect(() => {
    // WebSocket bağlantısını kur
    client.current = new W3CWebSocket(`ws://localhost:8000/ws/chat/${chatRoomId}/`);

    client.current.onopen = () => {
      console.log('WebSocket Client Connected');
      setIsConnected(true);
    };

    client.current.onclose = () => {
      console.log('WebSocket Client Disconnected');
      setIsConnected(false);
    };

    client.current.onerror = (error) => {
      console.error('WebSocket Error: ', error);
      setIsConnected(false);
    };

    client.current.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      setMessages((prevMessages) => [...prevMessages, dataFromServer.message]);
    };

    return () => {
      client.current.close();
    };
  }, [chatRoomId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (client.current.readyState === WebSocket.OPEN) {
      client.current.send(JSON.stringify({ message }));
      setMessage('');
    } else {
      console.error('WebSocket connection is not open');
    }
  };

  return (
    <div>
      <h2>Chat Room {chatRoomId}</h2>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={isConnected ? "Mesajınızı yazın..." : "Bağlantı kuruluyor..."}
          disabled={!isConnected}
        />
        <button type="submit" disabled={!isConnected}>Gönder</button>
      </form>
    </div>
  );
};

export default ChatRoom;
