import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import ChatRoom from './ChatRoom'; // ChatRoom bileşenini içe aktardık
import UserList from './UserList'; // UserList bileşenini içe aktardık

const App = () => {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [error, setError] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null); // Seçilen kullanıcıyı takip eden bir state ekledik
    const socketRef = useRef(null);

    useEffect(() => {
        // WebSocket connection creation
        socketRef.current = new WebSocket('ws://localhost:8000');

        // When connection is successful
        socketRef.current.onopen = () => {
            console.log('WebSocket connected');
        };

        // When a message is received
        socketRef.current.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.message) {
                setMessages((prevMessages) => [...prevMessages, message]);
            } else {
                console.log('Unknown message type:', message.type);
            }
        };

        // When there is an error
        socketRef.current.onerror = (error) => {
            setError('An error occurred: ' + error.message);
        };

        // When the connection is closed
        socketRef.current.onclose = () => {
            console.log('WebSocket connection closed');
        };

        // Close the connection when the component unmounts
        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, []);

    const handleSendMessage = () => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify({
                type: 'message',
                message: messageInput,
                sender: 'me', // Or get this dynamically if needed
                recipient: selectedUser // selectedUser'ı recipient olarak kullandık
            }));
            setMessageInput('');
        } else {
            setError('WebSocket connection is not open');
        }
    };

    const handleUserClick = (user) => {
        // Logic to handle user click
        console.log('User clicked:', user);
        setSelectedUser(user); // Seçilen kullanıcıyı güncelliyoruz
    };

    return (
        <div className="chat-room-container">
            <div className="top_div">
                <div className="profile"></div>
            </div>
            <div className="container">
                <UserList onUserClick={handleUserClick} />
            </div>
            <div className="third_div">
                {selectedUser ? ( // Eğer bir kullanıcı seçilmişse ChatRoom'u render ediyoruz
                    <ChatRoom chatRoomId={selectedUser.id} /> // chatRoomId olarak kullanıcının id'sini iletiyoruz
                ) : (
                    <div className="messages">
                        {messages.map((message, index) => (
                            <div key={index} className={`message ${message.sender === 'me' ? 'sent' : 'received'}`}>
                                <span className="content">{message.message}</span>
                            </div>
                        ))}
                    </div>
                )}
                <div className="input-container">
                    <input
                        type="text"
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        placeholder="Mesajınızı yazın"
                    />
                    <button onClick={handleSendMessage}>Gönder</button>
                </div>
                {error && <div style={{ color: 'red' }}>{error}</div>}
            </div>
        </div>
    );
};

export default App;
