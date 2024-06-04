import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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
      <h1>Kullanıcı Profili</h1>
      <p>Kullanıcı Adı: {profile.username}</p>
      <p>Email: {profile.email}</p>
      {profile.profile_picture && (
        <img src={profile.profile_picture} alt="Profil Resmi" />
      )}
    </div>
  );
};

export default UserProfile;

