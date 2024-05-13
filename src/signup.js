import React, { useState } from 'react';
import axios from 'axios';
import './signup.css';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [email, setEmail] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');


    return (
        <div className="card">
            <div className="card-body">
                <div className="all_elements">
                    <div className="form-outer">
                        <form id="form-input" action="http://localhost:8000/api/register/" method="post">
                            <i className="fa-solid fa-user"></i>
                            <input type="text" name="username" placeholder="Enter your username"/>
                            <br/> {/* Yeni satır için `<br />` kullanıldı */}
                            <i className="fa-solid fa-user"></i>
                            <input type="text" name="first_name" placeholder="Enter your Firstname"/>
                            <br/> {/* Yeni satır için `<br />` kullanıldı */}
                            <i className="fa-solid fa-user"></i>
                            <input type="text" name="last_name" placeholder="Enter your last name"/>
                            <br/> {/* Yeni satır için `<br />` kullanıldı */}
                            <i className="fa-solid fa-lock"></i>
                            <input type="password" name="password" placeholder="Enter your password"/>
                            <br/> {/* Yeni satır için `<br />` kullanıldı */}
                             <input type="email" name="email" placeholder="Enter your last email"/>
                            <br/> {/* Yeni satır için `<br />` kullanıldı */}
                            <a href="#" style={{textDecoration: 'none'}}> {/* Stil nesnesi olarak tanımlandı */}
                                <input type="submit" className="login" value="SIGNUP" id="login-form-submit"/>
                            </a>
                        </form>
                    </div>
                    <div className="login">
                        <a className="login_button" href="#">
                            You are already signup?
                        </a>
                    </div>
                </div>
            </div>
        </div>

    )

};


export default SignUp;
