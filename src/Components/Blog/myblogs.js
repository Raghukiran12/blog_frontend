// myblogs.js (frontend)
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import BlogCard from './blogCard'; // Import the BlogCard component
import { AuthContext } from '../auth/authContext'; // Update the path
import './myBlog.css';
const MyBlogs = () => {
  const [userBlogs, setUserBlogs] = useState([]);
  const { userId } = useContext(AuthContext);

  useEffect(() => {
    // Fetch blogs published by the currently logged-in user
    const fetchUserBlogs = async () => {
      try {
        console.log('Fetching blogs for user ID:', userId);

        const response = await axios.get(`https://zipthought-backend.onrender.com/api/blogs/user/${userId}`);
        console.log('API response:', response.data);

        setUserBlogs(response.data || []); // Ensure userBlogs is an array
      } catch (error) {
        console.error('Error fetching user blogs:', error.message);
      }
    };

    fetchUserBlogs();
  }, [userId]);

  const handleEdit = async (updatedBlog) => {
    try {
      const response = await axios.put(`https://zipthought-backend.onrender.com/api/blogs/${updatedBlog._id}`, updatedBlog);
      setUserBlogs((prevBlogs) => prevBlogs.map((prevBlog) => (prevBlog._id === updatedBlog._id ? response.data : prevBlog)));
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  const handleDelete = async (blogId) => {
    try {
      await axios.delete(`https://zipthought-backend.onrender.com/api/blogs/${blogId}`);
      setUserBlogs((prevBlogs) => prevBlogs.filter((prevBlog) => prevBlog._id !== blogId));
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };


  return (
    <div className="my-blogs">
      <h1>Your Blogs</h1>
      <div className="blog-cards">
        {userBlogs && userBlogs.length === 0 ? (
          <p>No blogs found. Start creating your blogs!</p>
        ) : (
          <>
            {userBlogs.map((blog) => (
              <BlogCard key={blog.userId} blog={blog} onEdit={handleEdit} onDelete={handleDelete}/>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default MyBlogs;
