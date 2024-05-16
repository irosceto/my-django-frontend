import React, { useState } from 'react';
import axios from 'axios';
import './signup.css';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault(); // Formun varsayılan davranışını engelle
        try {
            const response = await axios.post('http://localhost:8000/api/register/', {
                username,
                password,
                email,
                first_name: firstName, // backend'e uygun alan adlarını kullan
                last_name: lastName
            });
            // Başarılı kayıt durumunda yönlendirme yap
            if (response.status === 201) {
                window.location.href = "/home"; // Yönlendirme
            }
        }
        catch (error) {
            if (error.response.status === 400) {
                setErrorMessage(error.response.data.message); // Sunucudan dönen özel hata mesajını göster
            } else {
                setErrorMessage("An error occurred. Please try again later."); // Diğer hata durumlarında genel bir mesaj göster
            }
        }
    };

    return (
        <div className="card">
            <div className="card-body">
                <div className="all_elements">
                    <div className="form-outer">
                        <form id="form-input" onSubmit={handleSignUp}>
                            <i className="fa-solid fa-user"></i>
                            <input type="text" name="username" placeholder="Enter your username" onChange={(e) => setUsername(e.target.value)} />
                            <br />
                            <i className="fa-solid fa-user"></i>
                            <input type="text" name="first_name" placeholder="Enter your Firstname" onChange={(e) => setFirstName(e.target.value)} />
                            <br />
                            <i className="fa-solid fa-user"></i>
                            <input type="text" name="last_name" placeholder="Enter your last name" onChange={(e) => setLastName(e.target.value)} />
                            <br />
                            <i className="fa-solid fa-lock"></i>
                            <input type="password" name="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
                            <br />
                            <input type="email" name="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
                            <br />
                            <input type="submit" className="login" value="SIGNUP" id="login-form-submit" />
                        </form>
                    </div>
                    <div className="login">
                        <Link className="login_button" to="/home">
                            You are already signup?
                        </Link>
                    </div>
                </div>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Hata mesajını göster */}
            </div>
        </div>
    );
};

export default SignUp;
