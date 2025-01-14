import React, { useState, useEffect } from 'react';
import { getUsers, addUser, updateUser, deleteUser } from '../../../services/userservice';
import './admindashboard.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ firstname: '', lastname: '', email: '', password: '', address: '' });
  const [editingUser, setEditingUser] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await getUsers();
      console.log('Users loaded:', response.data);
      setUsers(response.data);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingUser({ ...editingUser, [name]: value });
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await addUser(newUser);
      setMessage('User added successfully');
      loadUsers();
      setNewUser({ firstname: '', lastname: '', email: '', password: '', address: '' });
    } catch (error) {
      console.error('Error adding user:', error);
      setMessage('Failed to add user');
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await updateUser(editingUser._id, editingUser);
      setMessage('User updated successfully');
      loadUsers();
      setEditingUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
      setMessage('Failed to update user');
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      setMessage('User deleted successfully');
      loadUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      setMessage('Failed to delete user');
    }
  };

  return (
    <div className="dashboard">
      <h1>Bienvenue, Admin</h1>
      <h2>User List</h2>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>
                <button onClick={() => setEditingUser(user)}>Edit</button>
                <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingUser && (
        <form onSubmit={handleUpdateUser}>
          <h2>Edit User</h2>
          <input
            type="text"
            name="firstname"
            value={editingUser.firstname}
            onChange={handleEditChange}
            placeholder="First Name"
            required
          />
          <input
            type="text"
            name="lastname"
            value={editingUser.lastname}
            onChange={handleEditChange}
            placeholder="Last Name"
            required
          />
          <input
            type="email"
            name="email"
            value={editingUser.email}
            onChange={handleEditChange}
            placeholder="Email"
            required
          />
          <input
            type="text"
            name="address"
            value={editingUser.address}
            onChange={handleEditChange}
            placeholder="Address"
            required
          />
          <button type="submit">Update User</button>
        </form>
      )}
      <form onSubmit={handleAddUser}>
        <h2>Add New User</h2>
        <input
          type="text"
          name="firstname"
          value={newUser.firstname}
          onChange={handleChange}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          name="lastname"
          value={newUser.lastname}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />
        <input
          type="email"
          name="email"
          value={newUser.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={newUser.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <input
          type="text"
          name="address"
          value={newUser.address}
          onChange={handleChange}
          placeholder="Address"
          required
        />
        <button type="submit">Add User</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AdminDashboard;
