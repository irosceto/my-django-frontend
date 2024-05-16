import React from 'react'
import { Link } from 'react-router-dom';


const Navigate = () => {
  return (
    <nav>
        <ul>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/chat">Login</Link></li>
        </ul>
    </nav>
  );
}

export default Navigate;
