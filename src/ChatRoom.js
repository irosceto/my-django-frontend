import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './App.css';

function ChatRoom() {
  const { roomID } = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const websocket = new WebSocket(`ws://localhost:8000/ws/chat/${roomID}/`);
    websocket.onopen = () => {
      console.log('Connected to WebSocket');
    };
    websocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages(prevMessages => [...prevMessages, message]);
    };
    websocket.onclose = () => {
      console.log('Disconnected from WebSocket');
    };
    setWs(websocket);

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [roomID]);

  const sendMessage = () => {
    if (!ws) {
      console.error('WebSocket connection is not established');
      return;
    }
    const newMessage = {
      message: message,
    };
    ws.send(JSON.stringify(newMessage));
    setMessage('');
  };

  return (
    <div className="chat-room">
      <div className="message-container">
        {messages.map((msg, index) => (
          <div key={index}>
            <p><strong>From:</strong> {msg.sender_id}</p>
            <p>{msg.message}</p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default ChatRoom;

