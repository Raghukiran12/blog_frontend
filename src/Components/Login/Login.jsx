// Login.js
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { AuthContext } from "../auth/authContext";
import ForgottenPasswordPopup from "./ForgottenPassword";

const Login = () => {
  const authContext = useContext(AuthContext);
  const { login } = authContext;
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSuccessfulLogin = (user) => {
    // Check if the user is an admin and show an alert
    if (user.role === "admin") {
      alert("Welcome Admin!");
      navigate("/adminhome");
      window.location.reload();
    } else {
      navigate('/profile');
      window.location.reload();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "https://zipthought-backend.onrender.com/users/login";
      const { data: res } = await axios.post(url, data);

      localStorage.setItem("token", res.token);
      localStorage.setItem("userData", JSON.stringify(res.user));

      login(data.email, data.password, res.user.userId);

      setLoginSuccess(true);
      setError("");
      handleSuccessfulLogin(res.user);

      if (res.token) {
        // No need to use navigatepage, as handleSuccessfulLogin handles the navigation
      }
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status < 500) {
        setError(error.response.data.message);
      } else {
        setError("Login failed. Please try again later.");
      }
      setLoginSuccess(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // No need to use navigatepage, as handleSuccessfulLogin handles the navigation
    }
  }, []);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Login to Your Account</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            {loginSuccess && (
              <div className={styles.success_msg}>Login Successfully</div>
            )}
            <button type="submit" className={styles.green_btn}>
              Sign In
            </button>
            <span type="button" onClick={openPopup} className={styles.forgot_password}>
              Forgotten Password?
            </span>
          </form>
        </div>
        <div className={styles.right}>
          <h1>New Here ?</h1>
          <Link to="/signup">
            <button type="button" className={styles.white_btn}>
              Sign Up
            </button>
          </Link>
        </div>
      </div>
      {showPopup && <ForgottenPasswordPopup closePopup={closePopup} />}
    </div>
  );
};

export default Login;
