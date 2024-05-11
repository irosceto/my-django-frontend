import React, { useState } from 'react';
import axios from 'axios';

const ProfileForm = () => {
  const [chatRooms, setChatRooms] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('chat_rooms', chatRooms);
    formData.append('profile_picture', profilePicture);

    try {
      const response = await axios.post('http://localhost:8000/api/profile_edit/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Profile updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="chat-rooms">Chat Rooms:</label>
        <input
          type="text"
          id="chat-rooms"
          value={chatRooms}
          onChange={(e) => setChatRooms(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="profile-picture">Profile Picture:</label>
        <input
          type="file"
          id="profile-picture"
          onChange={(e) => {
            const file = e.target.files[0];
            setProfilePicture(file ? file : null);
          }}
        />
      </div>
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default ProfileForm;
