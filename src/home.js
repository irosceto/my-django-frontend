import React, { useState } from 'react';
import axios from 'axios';

const LoginFormm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8000/api/token/',
        { username, password }
      );
      const token = response.data.token;
      localStorage.setItem('token', token);
      // Başarılı giriş yapıldıktan sonra istenilen bir işlem yapılabilir, örneğin yönlendirme yapılabilir.
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
