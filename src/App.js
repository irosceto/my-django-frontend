import React from 'react';
import ProfileForm from "./ProfileForm";

import SignUp from "./signup";
import LoginForm from "./login"


function App() {
  return (
    <div>
      <h1 className="h_bir">ChatApplication</h1>
      <LoginForm/> {/* UserProfile bileşenini kullanın */}
    </div>
  );
}

export default App;
