// Navbar.js
import React, { useState, useEffect } from 'react';
import './navbar.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [showmenubarlink, setshowmenubarlink] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated and if they have admin role
    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('userData'));
    
    if (token && userData) {
      setAuthenticated(true);
      setIsAdmin(userData.role === 'admin');
    } else {
      setAuthenticated(false);
      setIsAdmin(false);
    }
  }, []);

  const handleLogout = () => {
    // Clear user authentication state (remove token from localStorage)
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    setAuthenticated(false);
    // Redirect to the login page
    navigate('/login');

    window.location.reload();
  };


  return (
    <div>
      <nav className="main-nav">
        {/* logo part */}
        <div className="logo">
          <h2>
            <span>Z</span>IP
            <span>T</span>ought
          </h2>
        </div>

        {/* menu part */}
        <div
          className={showmenubarlink ? 'menu-link mobile-menu-link' : 'menu-link'}
        >
          <ul>
            {isAdmin ? (
              <>
                <li><Link to="/adminhome">Home</Link></li>
                <li><Link to="/userslist">User List</Link></li>
                <li><Link to="/allblogs">All Blogs</Link></li>
                <li><Link to='/logout' onClick={handleLogout}>Logout</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                {authenticated ? (
                  <>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/create-new-blog">Create</Link></li>
                    <li><Link to='/logout' onClick={handleLogout}>Logout</Link></li>
                  </>
                ) : (
                  <li><Link to="/login">Login</Link></li>
                )}
              </>
            )}
          </ul>
        </div>

        {/* Search Bar part */}
        <div className="flexbox">
          <div className="search">
            <div>
              <input type="text" placeholder="Search . . ." required />
            </div>
          </div>
        </div>

        {/* Hamburger menu */}
        <div className="hamburger-menu">
          <Link to={'#'} onClick={() => setshowmenubarlink(!showmenubarlink)}>
            <GiHamburgerMenu />
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
