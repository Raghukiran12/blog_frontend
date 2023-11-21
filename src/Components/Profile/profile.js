// profile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import './profile.css'; // Import the CSS file

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const user = JSON.parse(storedUserData);
      setUserData(user);
      setEditedData({ ...user }); // Set editedData initially to a copy of user data
    }
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      let profilePicUrl = editedData.profilePic;
      if (profilePicFile) {
        const formData = new FormData();
        formData.append('file', profilePicFile);
        formData.append('userId', userData.userId);

        // Send the file along with userId to the backend
        const response = await axios.post('http://localhost:4000/users/uploadProfilePic', formData);

        // Update profilePicUrl with the backend response
        profilePicUrl = response.data.fileUrl;
      }

      // Make API request to save edited data
      const saveResponse = await axios.put(`https://zipthought-backend.onrender.com/users/${userData.userId}`, {
        ...editedData,
        profilePic: profilePicUrl,
      });

      setUserData(saveResponse.data.user);
      setIsEditing(false);
      setProfilePicFile(null);
      setSaveSuccess(true);

      // Update local storage with saved data
      localStorage.setItem('userData', JSON.stringify(saveResponse.data.user));
    } catch (error) {
      console.error('Error saving data:', error.message);
      setSaveSuccess(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePicFile(file);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-sidebar">
        <NavLink to="/profile" activeclassname="selected">
          User Profile
        </NavLink>
        <NavLink to="/myblogs" activeclassname="selected">
          My Blogs
        </NavLink>
        <NavLink to="/usersettings" activeclassname="selected">
          Settings
        </NavLink>
      </div>
      <div className="dashboard-content">
        <div>
          <h1>User Profile</h1>
          {isEditing ? (
            <div className='edit'>
              <img src={profilePicFile ? URL.createObjectURL(profilePicFile) : editedData.profilePic} alt="Profile" className="profile-pic" /> <br></br>
              <label htmlFor="profilePic">Edit Profile Pic</label>
              <input
                type="file"
                id="profilePic"
                name="profilePic"
                onChange={handleFileChange}
              /><br></br>
              <label htmlFor="mobileNumber">Mobile Number</label>
              <input
                type="text"
                id="mobileNumber"
                name="mobileNumber"
                value={editedData.mobileNumber || ''}
                onChange={handleChange}
              /> <br></br>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={editedData.description || ''}
                onChange={handleChange}
              />
            </div>
          ) : (
            <div className='edit2'>
              <img src={userData.profilePic} alt="Profile" className="profile-pic" />
              <p>User ID: {userData.userId}</p>
              <p>Name: {userData.firstName} {userData.lastName}</p>
              <p>Email: {userData.email}</p>
              <p>Mobile Number: {userData.mobileNumber || 'N/A'}</p>
              <p>Description: {userData.description || 'N/A'}</p>
            </div>
          )}
          {isEditing ? (
            <button onClick={handleSaveClick}>Save</button>
          ) : (
            <button onClick={handleEditClick}>Edit</button>
          )}
          {saveSuccess && <p className='save'>Data saved successfully!</p>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
