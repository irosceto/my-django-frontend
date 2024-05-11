import React from 'react';
import ProfileForm from "./ProfileForm";
import Login from "./signup";
import SignUp from "./signup";



function App() {
  return (
    <div>
      <h1 className="h_bir">ChatApplication</h1>
      <SignUp/> {/* UserProfile bileşenini kullanın */}
    </div>
  );
}

export default App;
