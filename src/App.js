import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import SignUp from './signup';
import LoginForm from './home';
import Chat from './chat';
import ChatRoom from './ChatRoom';
import Profile from './Profile';

function App() {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));
  const [profilePicture, setProfilePicture] = useState('');

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/home" element={<LoginForm setAccessToken={setAccessToken} />} />
          <Route path="/chat" element={accessToken ? <Chat accessToken={accessToken} /> : <Navigate to="/home" />} />
          <Route path="/chat/:roomId" element={accessToken ? <ChatRoomWrapper accessToken={accessToken} profilePicture={profilePicture} /> : <Navigate to="/home" />} />
          <Route path="/profile" element={accessToken ? <Profile accessToken={accessToken} onProfilePictureChange={setProfilePicture} /> : <Navigate to="/home" />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

const ChatRoomWrapper = ({ accessToken, profilePicture }) => {
  const { roomId } = useParams();
  return <ChatRoom chatRoomId={roomId} accessToken={accessToken} profilePicture={profilePicture} />;
};

export default App;


