import {BrowserRouter, Routes, Route, useParams} from 'react-router-dom';
import SignUp from './signup';
import LoginForm from './home';
import Chat from './chat';
import ChatRoom from './ChatRoom'; // Varsayılan olarak doğru yolu belirlediğinizden emin olun

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/home" element={<LoginForm />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/chat/:roomId" element={<ChatRoomWrapper />} /> {/* component yerine element kullanmalısınız */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}
const ChatRoomWrapper = () => {
  const { roomId } = useParams();

  return <ChatRoom chatRoomId={roomId} />;
};

export default App;


