// ForgottenPasswordPopup.js
import React, { useState } from 'react';
import axios from 'axios';
import "./ForgottenPassword.css";
const ForgottenPasswordPopup = ({ closePopup }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async () => {
    try {
      const response = await axios.post('http://localhost:4000/users/reset-password', { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error resetting password. Please try again later.');
    }
  };

  return (
    <div className="popup-container">
      <div className="popup">
        <h2>Forgotten Password</h2>
        <label>Enter your Email to reset Your Password:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button onClick={handleResetPassword}>Reset Password</button>
        <p>{message}</p>
        <button onClick={closePopup}>Close</button>
      </div>
    </div>
  );
};

export default ForgottenPasswordPopup;
