const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./modules/auth/authroutes');
const userRoutes = require('./modules/users/userroutes');
const cors = require('cors');
const orderRoutes = require("./modules/orders/orderroutes");

const app = express();
const PORT = process.env.PORT || 5000;


// Connect to the database
connectDB();
app.use(cors({ origin: 'http://localhost:3000' }));
// Middleware to parse JSON requests
app.use(express.json());

// Define a basic route for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Pizza Ordering API');
});

// Use authentication routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use(express.json());
app.use("/api/orders", orderRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
