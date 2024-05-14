import React from 'react'
import { Link } from 'react-router-dom';

export default function Navigate(){
    return(
        <div>
            <Link to='/register'>Register</Link> {/*sayfayı her seferinde yeniden render etmemek için*/} 
            <br></br>
            <Link to='/login'>Login</Link>
        </div>
    )
}