// AdminHome.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminHome.css'; // Make sure to create this CSS file for styling

const AdminHome = () => {
  const [userCount, setUserCount] = useState(0);
  const [blogCount, setBlogCount] = useState(0);

  useEffect(() => {
    // Fetch user count
    axios.get('https://zipthought-backend.onrender.com/users/users/count')
      .then(response => setUserCount(response.data.count))
      .catch(error => console.error('Error fetching user count:', error));

    // Fetch blog count
    axios.get('https://zipthought-backend.onrender.com/api/blogs/count')
      .then(response => setBlogCount(response.data.count))
      .catch(error => console.error('Error fetching blog count:', error));

  }, []);

  return (
    <div className='body'>
    <div className="admin-home">
      <div className="flex-box">
        <h2>Number of Users Registered:</h2>
        <p>{userCount}</p>
      </div>
      <div className="flex-box">
        <h2>Number of Blogs Published:</h2>
        <p>{blogCount}</p>
      </div>
    </div>
    </div>
  );
};

export default AdminHome;
