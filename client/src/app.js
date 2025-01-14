import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './modules/auth/components/loginform'
import RegisterForm from './modules/auth/components/registerform';
import AdminDashboard from './modules/auth/pages/admindashboard';
import UserDashboard from './pages/homepage';
import WelcomePage from './pages/welcomepage';
import CreatePizza from './pages/CreatePizza';
import CartPage from './pages/CartPage';
import RandomPizza from './pages/RandomPizza';
import PreviousOrders from './pages/PreviousOrders';
import FavoriteOrders from './pages/FavoriteOrder';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/PreviousOrders" element={<PreviousOrders />} />
        <Route path="/RandomPizza" element={<RandomPizza />} />
        <Route path="/CreatePizza" element={<CreatePizza />} />
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/CartPage" element={<CartPage />} />
        <Route path="FavoriteOrder" element={<FavoriteOrders />} />
        </Routes>
    </Router>
  );
};

export default App;
