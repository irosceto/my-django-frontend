import React, { useState } from 'react';
import axios from 'axios';
import './signup.css';
import { useNavigate } from 'react-router-dom'; // useNavigate kancasını içe aktar
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [email, setEmail] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const navigate = useNavigate(); // useNavigate kancasını kullanarak yönlendirme yap

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/register/', {
                username: username,
                password: password,
                email: email,
                first_name: first_name,
                last_name: last_name
            });

            console.log(response.data.message); // veya başka bir mesaj
            // Başarılı kayıt olduktan sonra Login sayfasına yönlendirme
            navigate('/login'); // '/login' URL'sine yönlendirme

        } catch (error) {
            setErrorMessage(error.response.data.error);
            console.error('Error:', error);
        }
    };

    return (
        <div className="card">
            <div className="card-body">
                <div className="all_elements">
                    <div className="form-outer">
                        <form id="form-input" onSubmit={handleSubmit}>
                            <i className="fa-solid fa-user"></i>
                            <input type="text" name="username" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
                            <br/>
                            <i className="fa-solid fa-user"></i>
                            <input type="text" name="first_name" placeholder="Enter your Firstname" value={first_name} onChange={(e) => setFirstName(e.target.value)} />
                            <br/>
                            <i className="fa-solid fa-user"></i>
                            <input type="text" name="last_name" placeholder="Enter your last name" value={last_name} onChange={(e) => setLastName(e.target.value)} />
                            <br/>
                            <i className="fa-solid fa-lock"></i>
                            <input type="password" name="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <br/>
                            <i className="fa-solid fa-envelope"></i>
                            <input type="email" name="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <br/>
                            <Link to="/login" className="login">SIGNUP</Link>
                            {/*<button type="submit" className="login" id="login-form-submit">SIGNUP</button>*/}{/*butonu çalıştıramadığım için link formatında yaptım*/}
                        </form>
                    </div>
                    <div className="login">
                        <a className="login_button" href="login/">
                            You are already signup?
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;

