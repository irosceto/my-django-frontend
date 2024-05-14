import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import ProfileForm from "./ProfileForm";
import SignUp from "./signup";
import LoginFormm from "./home";
import Login from "./login"; 
import Navigate from "./Navigate";

function App() {
  return (
    <div>
      <h1 className="h_bir">ChatApplication</h1>
      <BrowserRouter>
        <Navigate/>
        <Routes>
          <Route path='/register' element={<SignUp/>} /> 
          <Route path='/login' element={<LoginFormm/>} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

