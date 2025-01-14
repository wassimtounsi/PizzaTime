import React, { useState } from 'react';
import { registerUser } from 'C:/project mern stack/client/src/api/authapi.js';
import './authstyles.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    address: '',
    isAdmin: false
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form with data:', formData);
    try {
      const response = await registerUser(formData);
      console.log('API response:', response.data);
      setMessage(response.data.message || 'Registration successful!');
    } catch (error) {
      console.error('Registration error:', error.response ? error.response.data : error.message);
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          value={formData.firstname}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          value={formData.lastname}
          onChange={handleChange}
          required
        />
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
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default RegisterForm;
