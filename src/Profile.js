import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './profile.css'; 

const Profile = ({ accessToken, onProfilePictureChange }) => {
  const [profile, setProfile] = useState({});
  const [formData, setFormData] = useState({
    profile_picture: null,
  });
  const [errors, setErrors] = useState({});
  const [profilePictureUrl, setProfilePictureUrl] = useState(null); // Yeni state tanımı

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/profile/', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        setProfile(response.data);
        if (response.data.profile_picture) {
          onProfilePictureChange(response.data.profile_picture);
          convertAndSetProfilePictureUrl(response.data.profile_picture);
        }
      } catch (error) {
        console.error("Profil verileri çekilirken bir hata oluştu!", error);
      }
    };

    fetchProfile();
  }, [accessToken, onProfilePictureChange]);

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      profile_picture: e.target.files[0]
    });
  };

  const convertAndSetProfilePictureUrl = async (imageUrl) => {
    try {
      const response = await axios.get(imageUrl, {
        responseType: 'blob'
      });

      const blob = response.data;
      const convertedUrl = URL.createObjectURL(blob);
      setProfilePictureUrl(convertedUrl);
    } catch (error) {
      console.error("Profil resmi dönüştürülürken bir hata oluştu!", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let form_data = new FormData();
    if (formData.profile_picture) {
      form_data.append('profile_picture', formData.profile_picture);
    }

    try {
      const response = await axios.post('http://localhost:8000/api/profile/', form_data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${accessToken}`
        }
      });
      alert('Profil fotoğrafı başarıyla güncellendi');
      setProfile(response.data);
      if (response.data.profile_picture) {
        onProfilePictureChange(response.data.profile_picture);
        convertAndSetProfilePictureUrl(response.data.profile_picture);
      }
    } catch (error) {
      if (error.response) {
        setErrors(error.response.data);
      }
    }
  };

  return (
    <div>
      <div className="yukari">
      <div className="geriii">
        <Link to="/chat" style={{ cursor: 'pointer', float: 'right', textDecoration: 'none' }}>Geri</Link>
        </div>
        
        <div className="profile-container">
      <div className="profile-info">
        <h1>Profil</h1>
        <div>
          <p>Kullanıcı Adı: {profile.username}</p>
          <p>Email: {profile.email}</p>
        </div>
      
      <form onSubmit={handleSubmit} className="profile-form">
        <div>
          <label>Profil Resmi:</label>
          <input
            type="file"
            name="profile_picture"
            onChange={handleFileChange}
          />
          {errors.profile_picture && <p>{errors.profile_picture.join(', ')}</p>}
        </div>
        <button type="submit">Kaydet</button>
      </form>
      </div>
      {profilePictureUrl && (
        <div className='profile-image'>
          <img src={profilePictureUrl} alt="Profil Resmi" />
        </div>
      )}
    </div>
        
      </div>
    </div>
    
  );
};

export default Profile;
