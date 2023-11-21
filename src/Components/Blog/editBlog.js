// EditBlog.js
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./createBlog.css";

const EditBlog = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.blog_description || "");
  const [title, setTitle] = useState(state?.blog_title || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.blog_category || "");
  const [fileVisible, setFileVisible] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const navigate = useNavigate();

  const yourJwtToken = localStorage.getItem('token');

  useEffect(() => {
    // Additional logic you might want to add when the component mounts
  }, []);

  const uploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post("https://zipthought-backend.onrender.com/api/blogs/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${yourJwtToken}`,
        },
      });

      if (response.data && response.data.imageUrl) {
        setFileVisible(true);
        return response.data.imageUrl;
      } else {
        console.error("File upload failed: Response does not contain 'imageUrl'");
        return null;
      }
    } catch (err) {
      console.error("Image upload error:", err);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (!state || !state.blog || !state.blog._id) {
        console.error('Invalid state structure. Unable to update blog.');
        return;
      }
  
      let imgUrl = '';
  
      if (file) {
        const uploadedImageUrl = await uploadImage();
        if (uploadedImageUrl) {
          imgUrl = uploadedImageUrl;
        } else {
          console.error('Image upload failed');
          return;
        }
      }
  
      const updatedBlogData = {
        blog_title: title,
        blog_description: value,
        blog_media: imgUrl,
        blog_category: cat,
      };
  
      const headers = {
        Authorization: `Bearer ${yourJwtToken}`,
      };
  
      await axios.put(`https://zipthought-backend.onrender.com/api/blogs/${state.blog._id}`, updatedBlogData, { headers });
  
      setUploadStatus('Successfully updated');
  
      setTimeout(() => {
        setUploadStatus('');
        navigate("/myblogs");
      }, 2000);
    } catch (err) {
      console.error('Error in handleSubmit:', err.response ? err.response.data : err.message);
      setUploadStatus('Failed to update');
    }
  };
  

  const handleCategoryClick = (category) => {
    setCat(category);
  };

  const isCategorySelected = (category) => {
    return cat === category ? "cat-selected" : "cat-unselected";
  };

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <div className="editorContainer">
          <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Update</h1>
          <span>
            <b>Status: </b> {uploadStatus}
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name=""
            onChange={(e) => {
              setFile(e.target.files[0]);
              setFileVisible(false);
            }}
          />
          <label className="file" htmlFor="file">
            {file ? file.name : "Upload Image"}
          </label>
          {fileVisible && <p>Uploaded: {file.name}</p>}
          <div className="buttons">
            <button onClick={handleSubmit}>Cancel</button>
            <button onClick={handleSubmit}>Update</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          {["art", "science", "technology", "cinema", "design", "food"].map((category) => (
            <div
              key={category}
              className={`cat-label ${isCategorySelected(category)}`}
              onClick={() => handleCategoryClick(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
