import React, { useState } from 'react';
import { loginUser } from 'C:/project mern stack/client/src/api/authapi.js'; 
import { useNavigate } from 'react-router-dom';
import './authstyles.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // fama redirect win taaml login 9a3ed isir nahhih
      //redirect lel page user wala admin heka lwahid // ey win 
        const response = await loginUser(formData);
  
      if (response.data && response.data.token) {
          console.log(response)
          localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.userId)); // Assuming response.data.user contains user details
  
        // Display success message
        setMessage(response.message || 'Successfully logged in!');
  
        if (response.data.route) {
          navigate(response.data.route);
        }
    } else {
        setMessage('Login failed: No token received.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      {message && <p className="message">{message}</p>} {/* Display error/success message */}
    </div>
  );
};

export default LoginForm;
