import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './UserProfile.css';

const UserProfile = ({ accessToken }) => {
  const [profile, setProfile] = useState(null);
  const { username } = useParams();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/profile/${username}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        setProfile(response.data);
      } catch (error) {
        console.error("Kullanıcı profili getirilirken bir hata oluştu!", error);
      }
    };

    fetchProfile();
  }, [username, accessToken]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="ust">
        <div className="gerii">
        <Link to="/chat/:roomId" style={{ cursor: 'pointer', float: 'right', textDecoration: 'none' }}>Geri</Link>
        </div>
        
      </div>
      <div className="en-dis">
        <div className="bilgi">
          <h1>Kullanıcı Profili</h1>
          <p>Kullanıcı Adı: {profile.username}</p>
          <p>Email: {profile.email}</p>
        </div>
        {profile.profile_picture && (
        <div className="resim">
          <img src={profile.profile_picture} alt="Profil Resmi" />
          </div>  
    )}
  </div>

    </div>
    
  );
};

export default UserProfile;

