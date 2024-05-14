import React from 'react';
import ProfileForm from "./ProfileForm";
import SignUp from "./signup";
import Login from "./login"; {/*Login bileşeni import edildi*/} 
import Navigate from "./Navigate";
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 

function App() {
  return (
    <div>
      <h1 className="h_bir">ChatApplication</h1>
      <BrowserRouter>
        <Navigate/> {/* UserProfile bileşenini kullanın */}
        <Routes>
          <Route path='/register' element={<SignUp/>} /> 
          <Route path='/login' element={<Login/>} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
