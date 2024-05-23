import React from 'react'
import { Link } from 'react-router-dom';

export default function Navigate(){
    return(
        <div>
            <Link to='/register'>Register</Link> {/*sayfayı her seferinde yeniden render etmemek için*/} 
            <br></br>
            <Link to='/home'>Login</Link>
            <br></br>
            <Link to='/chat'>Chat</Link>
            <br></br>
            <Link to='/chat/:roomId'>Message</Link>
            <br></br>

        </div>
    )
}