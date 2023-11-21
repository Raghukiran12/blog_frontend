// BlogCard.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./blogCard.css";

const BlogCard = ({ blog, onDelete }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [userProfilePic, setUserProfilePic] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedBlog, setEditedBlog] = useState({ ...blog });
  const [file, setFile] = useState(null);
  const [fileVisible, setFileVisible] = useState(false);
  const navigate = useNavigate();

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const expandBlog = () => {
    if (!isEditing) {
      setIsExpanded(true);
    }
  };

  const closeBlog = (e) => {
    e.stopPropagation();
    setIsExpanded(false);
  };

  const handleDelete = async () => {
    try {
      // Make an API call to delete the blog
      await axios.delete(`https://zipthought-backend.onrender.com/api/blogs/${blog._id}`);
      onDelete(blog._id); // Call the onDelete function to update the UI
      window.location.reload();
      alert("Blog deleted Successfully")
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const toggleOptions = (e) => {
    e.stopPropagation();
    setShowOptions(!showOptions);
  };

  const getDescription = () => {
    if (showFullDescription) {
      return blog.blog_description;
    } else {
      const words = blog.blog_description.split(' ');
      if (words.length > 8) {
        return words.slice(0, 8).join(' ') + '...';
      } else {
        return blog.blog_description;
      }
    }
  };

  useEffect(() => {
    const fetchUserProfilePic = async () => {
      try {
        const response = await axios.get(`https://zipthought-backend.onrender.com/users/${blog.userId}/profilepic`);
        setUserProfilePic(response.data.userProfilePic);
      } catch (error) {
        console.error('Error fetching user profile picture:', error.message);
      }
    };

    fetchUserProfilePic();
  }, [blog.userId]);

  const handleEditSubmit = async () => {
    try {
      let imgUrl = '';

      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post("https://zipthought-backend.onrender.com/api/blogs/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.data && response.data.imageUrl) {
          setFileVisible(true);
          imgUrl = response.data.imageUrl;
        } else {
          console.error("File upload failed: Response does not contain 'imageUrl'");
          return;
        }
      }

      const updatedBlogData = {
        blog_title: editedBlog.blog_title,
        blog_description: editedBlog.blog_description,
        blog_media: imgUrl || blog.blog_media,
      };

      // Implement the logic to update the blog on the server
      await axios.put(`https://zipthought-backend.onrender.com/api/blogs/${editedBlog._id}`, updatedBlogData);

      window.location.reload();
      // Assuming the update is successful, close the editing modal
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  return (
    <div
      className={`card ${isExpanded ? 'expanded' : ''}`}
      onClick={expandBlog}
      onMouseEnter={toggleOptions}
      onMouseLeave={toggleOptions}
    >
      <div className="card__header">
        <img src={`https://zipthought-backend.onrender.com/public${blog.blog_media}`} alt="card__image" className="card__image" />
        <div className="options">
          <span className={`ellipsis-icon ${showOptions ? 'up' : 'down'}`} onClick={toggleOptions}>...</span>
          {showOptions && (
            <div className="options-dropdown">
              <button onClick={handleEdit}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          )}
        </div>
      </div>
      <div className="card__body">
        <span className={`tag ${getTagColor(blog.blog_category)}`}>{blog.blog_category}</span>
        <h4>{blog.blog_title}</h4>
        <p>{getDescription()}</p>
      </div>
      <div className={`card__footer ${showOptions ? 'show-options' : ''}`}>
        <div className="user">
          <img src={userProfilePic} alt="user__image" className="user__image" />
          <div className="user__info">
            <h5>{blog.username}</h5>
            <small>{new Date(blog.createdAt).toLocaleString()}</small>
          </div>
        </div>
      </div>
      <div className={`expanded-blog ${isExpanded ? 'show' : ''}`} onClick={closeBlog}>
        <div className="close-button" onClick={closeBlog}>&#10006;</div>
        <div className="blog-content">
          <img src={`https://zipthought-backend.onrender.com/public${blog.blog_media}`} alt={blog.blog_title} />
          <h1>{blog.blog_title}</h1>
          <p className="card-description">{blog.blog_description}</p>
        </div>
      </div>
      {isEditing && (
        <div className="edit-blog-modal">
          <div className="modal-content">
            <h2>Edit Blog</h2>
            {/* Add your editing UI here */}
            <input
              type="text"
              value={editedBlog.blog_title}
              onChange={(e) => setEditedBlog({ ...editedBlog, blog_title: e.target.value })}
            />
            <ReactQuill
              value={editedBlog.blog_description}
              onChange={(value) => setEditedBlog({ ...editedBlog, blog_description: value })}
            />
            {/* Add other fields as needed */}
            <button onClick={handleEditSubmit}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
};

const getTagColor = (category) => {
  switch (category.toLowerCase()) {
    case 'technology':
      return 'tag-blue';
    case 'food':
      return 'tag-brown';
    case 'cinema':
      return 'tag-red';
    case 'design':
      return 'tag-blue';
    case 'art':
      return 'tag-brown';
    case 'Science':
      return 'tag-red';
    default:
      return '';
  }
};

export default BlogCard;
