const express = require('express');
const router = express.Router();
const { User, validateUser } = require('./usermodel');
const bcrypt = require('bcrypt');

// Route GET pour récupérer tous les utilisateurs
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Route POST pour ajouter un nouvel utilisateur
router.post('/', async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { firstname, lastname, email, password, address, isAdmin } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      address,
      isAdmin
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: 'Error adding user' });
  }
});

// Route PUT pour mettre à jour un utilisateur existant
router.put('/:id', async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: 'Error updating user' });
  }
});

// Route DELETE pour supprimer un utilisateur
router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting user' });
  }
});

module.exports = router;
