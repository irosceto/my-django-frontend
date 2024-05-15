import React from 'react';
import { BrowserRouter } from 'react-router-dom'; // BrowserRouter bileşenini import et
import SignUp from "./signup";

function App() {
  return (
    <div>
      <h1 className="h_bir">ChatApplication</h1>
      <BrowserRouter> {/* BrowserRouter ile SignUp bileşenini sarmala */}
        <SignUp />
      </BrowserRouter>
    </div>
  );
}

export default App;

