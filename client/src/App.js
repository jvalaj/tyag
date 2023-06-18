import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Footer from './components/footer'
import Navbar from './components/navbar';
import Home from './pages/home';
import Contact from './pages/contact';
import Products from './pages/products';
import Error from './pages/error';
import Register from './pages/Auth/register'
import Login from './pages/Auth/login';
import Dashboard from './pages/user/dashboard';
import AdminRoute from './components/routes/AdminRoute';
import PrivateRoute from './components/routes/private';
import ForgotPassword from './pages/Auth/forgotPassword';
import AdminDashboard from './pages/Admin/AdminDashboard';
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <Router>
      <Navbar />
      <Toaster />
      <Routes>
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
        </Route>

        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Products />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="*" element={<Error />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
