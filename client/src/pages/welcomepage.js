import React from 'react';
import { Link } from 'react-router-dom';
import './welcomepage.css';

const Welcome = () => {
  return (
    <div className="welcome-container">
      <h1>Pizza Time</h1>
      <div className="auth-options">
        <Link to="/login" className="auth-button">Login</Link>
        <Link to="/register" className="auth-button">Register</Link>
      </div>
    </div>
  );
};

export default Welcome;
