import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 

import SignUp from "./signup";
import LoginFormm from "./home";
import Navigate from "./Navigate";
import ChatRooms from "./chat";
import Chat from "./chat";
import LoginForm from "./home";


function App() {
  return (
    <div>
      <h1 className="h_bir">ChatApplication</h1>
      <BrowserRouter>
        <Navigate />
        <Routes>
          <Route path='/register' element={<SignUp/>} /> 
          <Route path='/home' element={<LoginForm/>} />
          <Route path='/chat' element={<Chat/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;