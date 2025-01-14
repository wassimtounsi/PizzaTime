const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../users/usermodel');
require('dotenv').config(); // Pour accéder à process.env.JWT_SECRET

// Register Controller
const register = async (req, res) => {
  const { firstname, lastname, email, password, address, isAdmin } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    // Convert isAdmin to boolean only if provided, default to false
    const isAdminBoolean = isAdmin ? (isAdmin === "true" || isAdmin === true) : false;

    // Create a new user
    const newUser = new User({
      firstname,
      lastname,
      email,
      password,
      address,
      isAdmin: isAdminBoolean
    });

    // Save user in the database
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error in register:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("object")
  try {
    // Check if user exists
    const user = await User.findOne({ email });
    console.log(user);

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const hashedEnteredPassword = await bcrypt.hash(password, 10);
    console.log(`Hashed entered password (for comparison): ${hashedEnteredPassword}`);
    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );

    // Send response with token and route based on user role
    const route = user.isAdmin ? '/admin-dashboard' : '/user-dashboard';
    res.status(200).json({
      userId:user._id,
      message: 'Login successful',
      route,
      token,
    });
//lmessage mach yodher
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};
module.exports = { register, login };
