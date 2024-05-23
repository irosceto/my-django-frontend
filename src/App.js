import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
          <Route path="/chat/:roomID" element={<ChatRoom />} /> {/* component yerine element kullanmalısınız */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
