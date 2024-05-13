import React from 'react';
import ProfileForm from "./ProfileForm";

import SignUp from "./signup";
import LoginForm from "./login"
import LoginFormm from "./home";


function App() {
  return (
    <div>
      <h1 className="h_bir">ChatApplication</h1>
      <LoginFormm/> {/* UserProfile bileşenini kullanın */}
    </div>
  );
}

export default App;
