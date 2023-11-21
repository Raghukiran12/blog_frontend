// allBlog.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../Blog/blogCard";
import "../Home/home.css"; // Make sure to create this CSS file for styling

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        let url = "https://zipthought-backend.onrender.com/api/blogs";
        if (selectedCategory) {
          url += `/category/${selectedCategory}`;
        }

        const response = await axios.get(url);
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, [selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  return (
    <div className="home">
      <div className="categories">
        <span
          className={selectedCategory === null ? "selected" : ""}
          onClick={() => handleCategoryClick(null)}
        >
          All
        </span>
        <span
          className={selectedCategory === "technology" ? "selected" : ""}
          onClick={() => handleCategoryClick("technology")}
        >
          Technology
        </span>
        <span
          className={selectedCategory === "food" ? "selected" : ""}
          onClick={() => handleCategoryClick("food")}
        >
          Food
        </span>
        <span
          className={selectedCategory === "cinema" ? "selected" : ""}
          onClick={() => handleCategoryClick("cinema")}
        >
          Cinema
        </span>
        <span
          className={selectedCategory === "art" ? "selected" : ""}
          onClick={() => handleCategoryClick("art")}
        >
          Art
        </span>
        <span
          className={selectedCategory === "science" ? "selected" : ""}
          onClick={() => handleCategoryClick("science")}
        >
          Science
        </span>
        <span
          className={selectedCategory === "design" ? "selected" : ""}
          onClick={() => handleCategoryClick("design")}
        >
          Design
        </span>
      </div>
      <div className="home-cards">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))
        ) : (
          <p>No Blogs Available in This Category.</p>
        )}
      </div>
    </div>
  );
};

export default AllBlogs;
