import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './profile.css'; // Import the CSS file

const UserSetting = () => {
  const userId = JSON.parse(localStorage.getItem('userData')).userId;
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    try {
      // Make an API call to delete the user and their blogs
      await axios.delete(`https://zipthought-backend.onrender.com/users/${userId}`);

      setDeleteSuccess(true);
      alert('Account deleted successfully');
      navigate('/signup'); // Redirect to the signup page after successful deletion
    } catch (error) {
      console.error('Error deleting account:', error);
      // Handle error, show error message, etc.
    }
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
        <h1>Settings</h1>
          <div className="faq-container">
            <h2>Frequently Asked Questions</h2>
            <details>
              <summary>How to post Blogs?</summary>
              <div>
              Once you log into your account, head over to the create section from the nav bar, Enter the content you wish to post along with selecting a cover image and type of category it belongs to, and click on post.
              </div>
            </details>
            <details>
              <summary>How to Edit My Blogs</summary>
              <div>
              Only a user who has posted the blog can edit it. Go to your blogs, find the blog you wish to edit, click on it and select edit, do the necessary changes and click save.
              </div>
            </details>
            <details>
              <summary>How to change Category of My Blogs</summary>
              <div>
              Head over to my blogs, click on edit blog and change the Category to which you would like to change and click save.
              </div>
            </details>
            <details>
              <summary>How to Delete Account?</summary>
              <div>
              Click on Profile from the nav bar and head to the settings page. You will find an option to Delete Account Permanently. Click on it to delete your account.
Warning: Once you delete your account, it cannot be retrieved back.
              </div>
            </details>
          </div>

          <div className="delete-container">
            <h2>Delete Account Permanently</h2>
            <p>
              Are you sure you want to delete your account? This action cannot be undone.
            </p>
            <br />
            <NavLink><span onClick={handleDeleteAccount} disabled={deleteSuccess}>
              Delete My Account
            </span></NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSetting;
