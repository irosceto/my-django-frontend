import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const LoginFormm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const  navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8000/api/token/',
        { username, password }
      );
      const token = response.data.token;
      localStorage.setItem('token', token);
      navigate('/chat'); // Burada '/chat' sayfasına yönlendirme yapılıyor
    } catch (error) {
      setError('Kullanıcı adı veya şifre hatalı.');
    }
  };

  return (
    <div>
      <h2>Giriş Yap</h2>
      <form onSubmit={handleSubmit}>
        <div>

          <label>Kullanıcı Adı:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Şifre:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit">Giriş Yap</button>
      </form>
    </div>
  );
};

export default LoginFormm;
