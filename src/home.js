import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/token/', {
                username,
                password
            });

            if (response.status === 200) {
                localStorage.setItem('refresh_token', response.data.refresh);
                localStorage.setItem('access_token', response.data.access);
                navigate("/chat");
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setErrorMessage("Invalid credentials");
            } else {
                setErrorMessage("An error occurred. Please try again later.");
            }
        }
    };

    return (
        <div className="card">
            <div className="card-body">
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <br />
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <br />
                    <input type="submit" value="LOGIN" />
                </form>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </div>
        </div>
    );
};



export default LoginForm;
