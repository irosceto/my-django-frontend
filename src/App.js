import { BrowserRouter, Routes, Route, useParams, Navigate } from 'react-router-dom';
import SignUp from './signup';
import LoginForm from './home';
import Chat from './chat';
import ChatRoom from './ChatRoom';
import { useState } from 'react';

function App() {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/home" element={<LoginForm setAccessToken={setAccessToken} />} />
          <Route path="/chat" element={accessToken ? <Chat accessToken={accessToken} /> : <Navigate to="/home" />} />
          <Route path="/chat/:roomId" element={accessToken ? <ChatRoomWrapper accessToken={accessToken} /> : <Navigate to="/home" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const ChatRoomWrapper = ({ accessToken }) => {
  const { roomId } = useParams();

  return <ChatRoom chatRoomId={roomId} accessToken={accessToken} />;
};

export default App;


